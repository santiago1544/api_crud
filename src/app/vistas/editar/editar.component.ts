import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PacienteI } from '../../modelos/paciente.interface';
import { ApiService } from '../../services/api/api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ResponseI } from 'src/app/modelos/response.interace';
import { AlertasService } from 'src/app/services/alertas/alertas.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit{

  constructor( private activaterouter:ActivatedRoute, private router:Router, private api:ApiService, private alertas:AlertasService){}

  datosPaciente:PacienteI;
  editarForm = new FormGroup({
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


  ngOnInit(): void {
    let pacienteid = this.activaterouter.snapshot.paramMap.get('id');
    let token = this.getToken();
    this.api.getSinglePacient(pacienteid).subscribe(data =>{
      this.datosPaciente = data[0];
      this.editarForm.setValue({
        'nombre': this.datosPaciente.Nombre,
        'correo': this.datosPaciente.Correo,
        'dni': this.datosPaciente.DNI,
        'direccion': this.datosPaciente.Direccion,
        'codigoPostal': this.datosPaciente.CodigoPostal,
        'genero': this.datosPaciente.Genero,
        'telefono': this.datosPaciente.Telefono,
        'token': token,
        'pacienteId': pacienteid,
        'fechaNacimiento': this.datosPaciente.FechaNacimiento
      });
    });
  }
  getToken(){
    return localStorage.getItem('token')
  }

  postForm(form: any){
    this.api.putPatient(form).subscribe(data =>{
      let respuesta:ResponseI = data;
        if(respuesta.status == "ok"){
            this.alertas.showSuccess('Datos modificados','Hecho');
        }else{
            this.alertas.showError(respuesta.result.error_msg,'Error');
        }
    })
  }

  eliminar(){
    let datos:any = this.editarForm.value;
    this.api.deletePatient(datos).subscribe(data =>{
      let respuesta:ResponseI = data;
        if(respuesta.status == "ok"){
            this.alertas.showSuccess('Paciente eliminado','Hecho');
            this.router.navigate(['dashboard']);
        }else{
            this.alertas.showError(respuesta.result.error_msg,'Error');
        }
    })
  }

  salir(){
    this.router.navigate(['dashboard']);
  }

}
