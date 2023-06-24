import { Component, OnInit } from '@angular/core';
import { ApiService} from '../../services/api/api.service';
import { Router } from '@angular/router';
import { ListaPacientesI} from '../../modelos/listapacientes.interface'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  pacientes!: ListaPacientesI[];

  constructor(private api:ApiService, private router:Router){}

  ngOnInit(): void {
    this.api.getAllPatients(1).subscribe(data =>{
      this.pacientes = data;
    })
  }

  editarPaciente(id: any){
    this.router.navigate(['editar', id]);
  }

  nuevoPaciente(){
    this.router.navigate(['nuevo']);
  }

}
