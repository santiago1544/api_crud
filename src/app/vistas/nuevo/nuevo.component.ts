import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../../services/api/api.service';
import { AlertasService } from 'src/app/services/alertas/alertas.service';
import { ResponseI } from 'src/app/modelos/response.interace';
import { Router, ActivatedRoute } from '@angular/router';
import { PacienteI } from 'src/app/modelos/paciente.interface';

@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.css']
})
export class NuevoComponent implements OnInit{
  nuevoForm = new FormGroup({
    nombre: new FormControl(''),
    correo : new FormControl(''),
    dni: new FormControl(''),
    direccion: new FormControl(''),
    codigoPostal: new FormControl(''),
    genero: new FormControl(''),
    telefono: new FormControl(''),
    token: new FormControl(''),
    pacienteId: new FormControl(''),
    fechaNacimiento: new FormControl('')
  });

  constructor (private activaterouter:ActivatedRoute, private router:Router, private api:ApiService, private alertas:AlertasService){}

  ngOnInit(): void {
    let token = localStorage.getItem('token');
    this.nuevoForm.patchValue({
      'token' : token
    });
  }

  postForm(form:any){
      this.api.postPatient(form).subscribe( data =>{
          console.log(data);
      })
  }

  salir(){
    this.router.navigate(['dashboard']);
  }
}
