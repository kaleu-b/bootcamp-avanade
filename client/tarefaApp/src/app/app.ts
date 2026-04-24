import { ChangeDetectorRef, Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CommonModule } from "@angular/common";
import { TarefaFormComponent } from "./components/tarefa-form/tarefa-form";
import { TarefaListComponent } from "./components/tarefa-list/tarefa-list";

// componente container que orquestra os componentes filhos
@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, TarefaFormComponent, TarefaListComponent],
  templateUrl: "./app.html",
})
// exporta a classe do componente para ser usada em outros lugares
export class AppComponent {
  api = "http://localhost:5097/tarefas";
  // propriedades da classe pra armazenar as tarefas, editar tarefas, etc.
  tarefas: any[] = [];
  editando: any = null;

  // injeção do HttpClient e ChangeDetectorRef para fazer requisições à API e forçar atualização da view
  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {
    this.load();
  }

  // carrega todas as tarefas da API e armazena na propriedade tarefas
  load() {
    this.http.get<any[]>(this.api).subscribe((res) => {
      this.tarefas = [...res];
      this.cdr.markForCheck(); // força a atualização da view
    });
  }

  // adiciona uma tarefa no banco de dados com a API usando post, depois limpa o formulário e recarrega a lista de tarefas
  add(nova: any) {
    this.http.post(this.api, nova).subscribe(() => {
      this.load();
    });
  }

  // deleta uma tarefa usando o id dela na API, depois recarrega a lista de tarefas
  delete(id: number) {
    this.http.delete(`${this.api}/${id}`).subscribe(() => this.load());
  }

  // prepara a tarefa para edição criando uma cópia dela, para não editar diretamente na lista
  editar(t: any) {
    // cria cópia pra não editar direto na lista
    this.editando = { ...t };
    this.cdr.markForCheck();
  }

  // salva as alterações da tarefa editada usando put na API, depois limpa a tarefa editada e recarrega a lista de tarefas
  salvar(editando: any) {
    if (!editando) return;

    this.http
      .put(`${this.api}/${editando.id}`, editando)
      .subscribe(() => {
        this.editando = null;
        this.load();
      });
  }

  // cancela a edição limpando a tarefa editada, sem salvar as alterações
  cancelar() {
    this.editando = null;
    this.cdr.markForCheck();
  }
}