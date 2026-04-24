using System.ComponentModel.DataAnnotations;
public class Tarefa
{
    [Key]
    public int Id { get; set; }
    [Required]
    public string Titulo { get; set; } = String.Empty;
    public string Descricao { get; set; } = String.Empty;
    [Required]
    public string Status { get; set; } = "Pendente";
    public DateTime DataCriacao { get; set; } = DateTime.Now;
}