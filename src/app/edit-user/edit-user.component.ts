import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../user.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent implements OnInit {
  userId: string;
  userForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {
    this.userId = this.route.snapshot.params['id'];

    this.userForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required]],
      skillsets: ['', [Validators.required]],
      hobby: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.userService.getUserById(this.userId).subscribe((user) => {
      this.userForm.patchValue(user);
    });
  }

  cancel() {
    this.router.navigate(['/users']);
  }

  editUser() {
    this.errorMessage = '';

    if (this.userForm.invalid) {
      this.errorMessage = 'Please fill out all the required fields.';
      return;
    }

    const userFormValue = this.userForm.value;

    if (typeof userFormValue.skillsets === 'string') {
      userFormValue.skillsets = userFormValue.skillsets
        .split(',')
        .map((skill: string) => skill.trim());
    } else {
      userFormValue.skillsets = userFormValue.skillsets.map((skill: string) =>
        skill.trim()
      );
    }

    this.userService.updateUser(this.userId, userFormValue).subscribe({
      next: (data) => {
        this.snackBar.open('Success: User updated', 'Close', {
          duration: 5000,
          panelClass: ['success-snackbar'],
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      },
      error: (error) => {
        this.snackBar.open(`Error: ${error.error.message}`, 'Close', {
          duration: 5000,
          panelClass: ['error-snackbar'],
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      },
    });
  }

  deleteUser() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        return;
      }

      this.userService.deleteUser(this.userId).subscribe({
        next: (data) => {
          this.snackBar.open('Success: User deleted', 'Close', {
            duration: 5000,
            panelClass: ['success-snackbar'],
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
          this.router.navigate(['/users']);
        },
        error: (error) => {
          this.snackBar.open(`Error: ${error.error.message}`, 'Close', {
            duration: 5000,
            panelClass: ['error-snackbar'],
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        },
      });
    });
  }
}
