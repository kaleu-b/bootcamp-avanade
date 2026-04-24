import { Component, Output, EventEmitter } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

/**
 * Componente TarefaFormComponent
 * 
 * Responsável por renderizar o formulário para criar uma nova tarefa.
 * Permite que o usuário insira título, descrição e selecione um status.
 * Valida se o título não está vazio antes de emitir o evento.
 * 
 * Outputs:
 *  - adicionarTarefa: emitido quando o usuário clica em "Adicionar" com dados válidos
 *  - emite um objeto com { titulo, descricao, status }
 */
@Component({
  selector: "app-tarefa-form",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./tarefa-form.html",
  styleUrl: "./tarefa-form.less",
})
export class TarefaFormComponent {
  // Emite o evento quando uma nova tarefa é adicionada
  @Output() adicionarTarefa = new EventEmitter<any>();

  // Objeto que armazena os dados da nova tarefa sendo preenchida
  nova = {
    titulo: "",
    descricao: "",
    status: "Pendente",
  };

  /**
   * Valida e adiciona a nova tarefa
   * Verifica se o título não está vazio antes de emitir o evento
   * Reseta o formulário após enviar com sucesso
   */
  add() {
    if (this.nova.titulo.trim()) {
      this.adicionarTarefa.emit(this.nova);
      // Reseta o formulário para estado inicial
      this.nova = { titulo: "", descricao: "", status: "Pendente" };
    }
  }
}
