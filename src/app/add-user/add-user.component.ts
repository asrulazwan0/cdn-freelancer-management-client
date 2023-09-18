import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent {
  userForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.userForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required]],
      skillsets: ['', [Validators.required]],
      hobby: ['', [Validators.required]],
    });
  }

  cancel() {
    this.router.navigate(['/users']);
  }

  addUser() {
    this.errorMessage = '';

    if (this.userForm.invalid) {
      this.errorMessage = 'Please fill out all the required fields.';
      return;
    }

    const userFormValue = this.userForm.value;
    userFormValue.skillsets = userFormValue.skillsets
      .split(',')
      .map((skill: string) => skill.trim());

    this.userService.createUser(userFormValue).subscribe({
      next: (data) => {
        this.snackBar.open('Success: User added', 'Close', {
          duration: 5000,
          panelClass: ['success-snackbar'],
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
        this.router.navigate(['/users']);
      },
      error: (error) => {
        this.snackBar.open(`Error: ${error.error.message}`, 'Close', {
          duration: 5000,
          panelClass: ['error-snackbar'],
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
      },
    });
  }
}
