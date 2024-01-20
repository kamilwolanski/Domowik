using Domowik.Modules.Users.Api;
using Domowik.Shared;

var builder = WebApplication.CreateBuilder(args);
builder.Services
    .AddUsersModule()
    .AddSharedFramework(builder.Configuration);

var app = builder.Build();

app.UserSharedFramework();
app.UseUsersModule();
app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
    endpoints.MapGet("/", ctx => ctx.Response.WriteAsync("Domowik API"));
});
app.Run();
