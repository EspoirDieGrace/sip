import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


 
import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { LoginObject } from 'src/app/shared/model/LoginObject.model';
import { UtilisateurService } from 'src/app/shared/services/Utilisateur.service';
import { UtilisService } from 'src/app/shared/services/Utilis.service';
import { AuthentificationService } from 'src/app/shared/services/authentification.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfigService } from 'ngx-envconfig';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit, OnDestroy {

  list_subsc:Subscription = new Subscription();
  
  loginForm!: FormGroup;
  user: any;
  isLoading:boolean;
  loggedIn: boolean;
  tokenEnable: any;
  homeDirectory = this.configService.get('homeDirectory')


  constructor(
    private fb: FormBuilder,
    private utilisateurService : UtilisateurService,
    private utilisService : UtilisService,  
    private router : Router,
    private activatedRoute:ActivatedRoute,
    private configService: ConfigService,
    private auth : AuthentificationService,
    private authService: SocialAuthService) {}

  ngOnInit(): void {
    this.buildForm()
    this.list_subsc.add(this.authService.authState.subscribe((user) => {
      
    }));
  }



  buildForm(){
    this.loginForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }



  ngOnDestroy(): void{
    this.list_subsc.unsubscribe();
  }



  submit(): void{
    this.isLoading = true;
    let login:LoginObject = new LoginObject();
    if (this.tokenEnable) {
      //login.token = this.token
    }
    login.email = this.loginForm.controls.userName.value.trim();
    login.password = this.loginForm.controls.password.value

    setTimeout(() => {
      this.isLoading = false;
    }, 2500);
    if (login.email == "admin" && login.password == "admin" ) {
      //this.auth.addUserToLocalStorage(this.utilisService.deleteHibernate({}));
      this.router.navigate([this.homeDirectory])
    }else{
      this.utilisService.createNotification("warning","Login ou mot de passe incorrecte","Veuillez verifier vos parametres de connexion ")
    }

   // this.logIn(login)

  }



  logIn(login:LoginObject){
    this.utilisateurService.login(login).subscribe(
      (data) => this.utilisService.response(data, (d) => {
        this.isLoading = false;
        if (d) {
          this.auth.addUserToLocalStorage(this.utilisService.deleteHibernate(d));
          this.router.navigate([this.homeDirectory])
        }else{
          this.utilisService.createNotification("warning","Login ou mot de passe incorrecte","Veuillez verifier vos parametres de connexion ")
        }
       
      }),
      (error) => this.utilisService.response(error,(d) => {
        this.isLoading = false;
      })
    )
  }

  actionOnLogin(user){
    this.user = user;
      console.log(user);
      
      if(user.id){
        let newUser = new LoginObject();
        newUser.email = user.email ? user.email : `${user.last_name}@${user.name}.com`;
        newUser.password = user.id;
        //success
        this.logIn(newUser)
      }
      this.loggedIn = (user != null);
  }


  signInWithGoogle(): void {
    console.log("ok");
    
    // this.authService.signIn(GoogleLoginProvider.PROVIDER_ID)
    // .then(res => this.actionOnLogin(res))
    // .catch(res => console.log(res)    )
  }
 
  signInWithFB(): void {
    // this.authService.signIn(FacebookLoginProvider.PROVIDER_ID)
    // .then(res => this.actionOnLogin(res))
    // .catch(res => console.log(res)    )
  }
 
}
