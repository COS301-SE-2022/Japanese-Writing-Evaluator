export interface ForgotPasswordEmail { /// the forgot password email sent to backend
    email: string;
}

export interface ForgotPasswordPassword { /// the forgot password new password sent to backend
    password: string;
    token: string;
}
