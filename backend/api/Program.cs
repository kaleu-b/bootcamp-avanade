// usando o entity framework core para acesso ao banco de dados
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
// configura o DbContext para usar SQL Server
builder.Services.AddDbContext<AppDb>(opt =>
    opt.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
// configura o CORS para permitir requisições de qualquer origem
builder.Services.AddCors(opt =>
    opt.AddDefaultPolicy(p => p.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod()));
 
var app = builder.Build();

app.UseCors();
// endpoint para listar todas as tarefas
app.MapGet("/tarefas", async (AppDb db) =>
    await db.Tarefas.ToListAsync());
// endpoint para obter uma tarefa por ID
app.MapGet("/tarefas/{id}", async (int id, AppDb db) =>
{
    var t = await db.Tarefas.FindAsync(id);
    return t is null ? Results.NotFound() : Results.Ok(t);
});
// endpoint para criar uma nova tarefa
app.MapPost("/tarefas", async (Tarefa t, AppDb db) =>
{
    db.Tarefas.Add(t);
    await db.SaveChangesAsync();
    return Results.Ok(t);
});
// endpoint para editar uma tarefa existente
app.MapPut("/tarefas/{id}", async (int id, Tarefa t, AppDb db) =>
{
    var existing = await db.Tarefas.FindAsync(id);
    if (existing is null) return Results.NotFound();

    existing.Titulo = t.Titulo;
    existing.Descricao = t.Descricao;
    existing.Status = t.Status;
    existing.DataCriacao = t.DataCriacao;
    await db.SaveChangesAsync();
    return Results.Ok(existing);
});
// endpoint para excluir uma tarefa
app.MapDelete("/tarefas/{id}", async (int id, AppDb db) =>
{
    var t = await db.Tarefas.FindAsync(id);
    if (t is null) return Results.NotFound();

    db.Tarefas.Remove(t);
    await db.SaveChangesAsync();
    return Results.Ok();
});
// inicia o aplicativo
app.Run();
// classe de contexto do banco de dados 
class AppDb : DbContext
{ 
    public AppDb(DbContextOptions<AppDb> options) : base(options) { }
    public DbSet<Tarefa> Tarefas => Set<Tarefa>();
}