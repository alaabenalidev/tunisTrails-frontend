import {Component, OnInit} from "@angular/core";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../auth.service";
import {TokenStorageService} from "../token-storage.service";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
    public newUser = false;
    // public user: firebase.User;
    public loginForm: FormGroup;
    public show: boolean = false
    public errorMessage: any;

    constructor(private authService: AuthService, private fb: FormBuilder, public router: Router, private tokenStorageService: TokenStorageService) {
        this.loginForm = this.fb.group({
            email: ["admin@mail.com", [Validators.required, Validators.email]],
            password: ["password", Validators.required],
        });
    }

    ngOnInit() {
    }

    login() {
        this.authService.login(this.loginForm.value["email"], this.loginForm.value["password"]).subscribe((tokens: {
                access_token: string,
                refresh_token: string
            }) => {
                this.tokenStorageService.saveToken(tokens.access_token)

                this.router.navigateByUrl("/dashboard/defaul");
            },
            (error) => console.log("error login")
        )

        /*if (this.loginForm.value["email"] == "Test@gmail.com"
            && this.loginForm.value["password"] == "test123") {
            let
                user = {
                    email: "Test@gmail.com",
                    password: "test123",
                    name: "test user",
                };
            localStorage.setItem("user",JSON.stringify(user));
            this.router.navigate(["/dashboard/default"]);
        }*/
    }

    showPassword() {
        this.show = !this.show
    }
}
