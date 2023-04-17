import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { UtilisateurService } from 'src/app/shared/services/Utilisateur.service';
import { UtilisService } from 'src/app/shared/services/Utilis.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthentificationService } from 'src/app/shared/services/authentification.service';
import { SocialAuthService } from 'angularx-social-login';
import { Utilisateur } from 'src/app/shared/model/Utilisateur.model';
import { LoginObject } from 'src/app/shared/model/LoginObject.model';
import { TableSetting } from 'src/app/shared/model/TableSetting.model';
import { TypeutilisateurService } from 'src/app/shared/services/Typeutilisateur.service';
import { nextTick } from 'process';

import { Pdv } from 'src/app/shared/model/Pdv.model';
import { tileLayer, latLng, marker, icon, Map } from 'leaflet';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  @ViewChild('loginTpl') loginView: TemplateRef<void>;
  @ViewChild('pdvTpl') pdvView: TemplateRef<void>;

  // currentView: any = this.loginView;
  current = 0;
  loginForm!: FormGroup;
  user: any;
  loggedIn: boolean;
  tokenEnable: any;
  listeTypeutilisateur: any;
  selectSetting: TableSetting = {
    checkbox: false,
    loading: false,
  };

  pdvForm: FormGroup;
  layers: any = [
    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }),
  ];

  options = {
    layers: this.layers,
    zoom: 12,
    center: latLng([5.316376, -3.89219]),
  };

  constructor(
    private fb: FormBuilder,
    private utilisateurService: UtilisateurService,
    private utilisService: UtilisService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private typeutilisateurService: TypeutilisateurService,
    private auth: AuthentificationService,
    private authService: SocialAuthService
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.buildPdvForm();
    this.getTypesutilisateur();
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = user != null;
    });
  }

  // buildForm(){
  //   this.loginForm = this.fb.group({
  //     userName: [null, [Validators.required]],
  //     password: [null, [Validators.required]],
  //     remember: [true]
  //   });
  // }

  buildForm() {
    console.log();
    let fv: any; //FormValue

    this.loginForm = this.fb.group({
      utilisateurid: [fv && fv.utilisateurid ? fv.utilisateurid : '', []],
      utilisateuremail: [
        fv && fv.utilisateuremail ? fv.utilisateuremail : '',
        [Validators.email, Validators.required],
      ],
      utilisateurnom: [
        fv && fv.utilisateurnom ? fv.utilisateurnom : '',
        [Validators.required],
      ],
      utilisateurpassword: [
        {
          value: fv && fv.utilisateurpassword ? fv.utilisateurpassword : '',
          disabled: fv && fv.utilisateurpassword,
        },
        [Validators.required, Validators.minLength(6)],
      ],
      utilisateurconfirmpassword: [
        {
          value: fv && fv.utilisateurpassword ? fv.utilisateurpassword : '',
          disabled: fv && fv.utilisateurpassword,
        },
        [Validators.required, this.confirmationValidator],
      ],
      utilisateurcontact: [
        fv && fv.utilisateurcontact ? fv.utilisateurcontact : '',
        [],
      ],
      typeutilisateur: [
        fv && fv.typeutilisateur ? fv.typeutilisateur.typeutilisateurid : '',
        [Validators.required],
      ],
    });
  }

  buildPdvForm() {
    let fv: Pdv; //FormValue
    //Si Le formulaire a ete prealablement rempli avec des coordonnees
    this.pdvForm = this.fb.group({
      pdvid: [fv && fv.pdvid ? fv.pdvid : '', []],
      pdvname: [fv && fv.pdvname ? fv.pdvname : '', [Validators.required]],
      pdvcommentaire: [fv && fv.pdvcommentaire ? fv.pdvcommentaire : '', []],
      pdvcontact: [fv && fv.pdvcontact ? fv.pdvcontact : '', []],
      pdvheureouverture: [
        fv && fv.pdvheureouverture
          ? this.utilisService.dateFromHour(fv.pdvheureouverture)
          : null,
        [],
      ],
      pdvheurefermeture: [
        fv && fv.pdvheurefermeture
          ? this.utilisService.dateFromHour(fv.pdvheurefermeture)
          : null,
        [],
      ],
      pdvjourouverture: [
        fv && fv.pdvjourouverture ? fv.pdvjourouverture : null,
        [],
      ],
      pdvlong: [fv && fv.pdvlong ? fv.pdvlong : '', []],
      pdvlat: [fv && fv.pdvlat ? fv.pdvlat : '', []],
      pdvaddress: [fv && fv.pdvaddress ? fv.pdvaddress : '', []],
      commune: [fv && fv.commune ? fv.commune.communeid : '', []],
      ville: [fv && fv.commune ? fv.commune.ville.villeid : '', []],
      typepdv: [fv && fv.typepdv.typepdvid ? fv.typepdv.typepdvid : null, []],
      gservices: [null, []],
      produits: [null, []],
    });
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (
      control.value !== this.loginForm.controls.utilisateurpassword.value
    ) {
      return { confirm: true, warning: true };
    }
    return {};
  };

  submit(): void {
    let login: LoginObject = new LoginObject();
    if (this.tokenEnable) {
      //login.token = this.token
    }
    login.email = this.loginForm.controls.userName.value.trim();
    login.password = this.loginForm.controls.password.value;
    this.utilisateurService.login(login).subscribe(
      (data) =>
        this.utilisService.response(data, (d) => {
          this.auth.addUserToLocalStorage(d);
          this.router.navigate(['dashboard']);
        }),
      (error) => {}
    );
  }

  nextStep(): void {
    this.current++;
  }

  ////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// FONCTIONS GET

  getTypesutilisateur() {
    this.selectSetting.loading = true;
    this.typeutilisateurService.getAll().subscribe(
      (data) =>
        this.utilisService.response(data, (d) => {
          console.log(d);
          this.listeTypeutilisateur = d;
          this.selectSetting.loading = false;
        }),
      (error) => this.utilisService.response(error)
    );
  }
}
