import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdicionaComponent } from './adiciona/adiciona.component';
import { EditeComponent } from './edite/edite.component';
import { HomeComponent } from './home/home.component';
import { NavigationService } from '../navigation.service'; 

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'adiciona', component: AdicionaComponent },
  {
    path: 'edite/:id',
    component: EditeComponent,
    // Adiciona um `data` para identificar a rota 'edite' e emitir um sinal quando navegado
    data: { signal: 'edite-route' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventosRoutingModule {
  constructor(private navigationService: NavigationService) {
    this.setupRouteListeners();
  }

  private setupRouteListeners(): void {
    // Escuta as mudanças de rota e emite sinais conforme necessário
    this.navigationService.navigationSignal$.subscribe((signal) => {
      console.log('Navigation Signal:', signal);
    });
  }
}
