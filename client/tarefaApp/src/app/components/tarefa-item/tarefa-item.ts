import { Component, Input, Output, EventEmitter } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

/**
 * Componente TarefaItemComponent
 * 
 * Responsável por renderizar e gerenciar um item individual de tarefa.
 * Este componente exibe as informações da tarefa (título, descrição, status)
 * e oferece opções para editar ou deletar a tarefa.
 * 
 * Inputs:
 *  - tarefa: objeto contendo os dados da tarefa (id, titulo, descricao, status)
 *  - editando: objeto da tarefa que está sendo editada ou null
 * 
 * Outputs:
 *  - editar: emitido quando o usuário clica em editar
 *  - salvar: emitido quando o usuário salva as alterações
 *  - cancelar: emitido quando o usuário cancela a edição
 *  - deletar: emitido quando o usuário clica em deletar
 */
@Component({
  selector: "app-tarefa-item",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./tarefa-item.html",
  styleUrl: "./tarefa-item.less",
})
export class TarefaItemComponent {
  // Recebe a tarefa a ser exibida
  @Input() tarefa: any;
  // Recebe a tarefa que está sendo editada
  @Input() editando: any;
  // Emite quando o usuário quer editar a tarefa
  @Output() editar = new EventEmitter<any>();
  // Emite quando o usuário salva as alterações
  @Output() salvar = new EventEmitter<any>();
  // Emite quando o usuário cancela a edição
  @Output() cancelar = new EventEmitter<void>();
  // Emite quando o usuário quer deletar a tarefa
  @Output() deletar = new EventEmitter<number>();

  // Passa para o pai que o usuário quer editar esta tarefa
  onEditar() {
    this.editar.emit(this.tarefa);
  }

  // Passa para o pai as alterações a serem salvas
  onSalvar() {
    this.salvar.emit(this.editando);
  }

  // Passa para o pai que o usuário cancelou a edição
  onCancelar() {
    this.cancelar.emit();
  }

  // Passa para o pai o id da tarefa a ser deletada
  onDeletar() {
    this.deletar.emit(this.tarefa.id);
  }

  // Getter que verifica se a tarefa atual está sendo editada
  get isEditando(): boolean {
    return this.editando?.id === this.tarefa.id;
  }
}
