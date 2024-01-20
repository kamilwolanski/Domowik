using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;

namespace Domowik.Shared;

public static class Extensions
{
    private const string ApiTitle = "Domowik API";
    private const string ApiVersion = "v1";

    public static IServiceCollection AddSharedFramework(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddControllers();
        services.AddSwaggerGen(swagger =>
        {
            swagger.EnableAnnotations();
            swagger.CustomSchemaIds(x => x.FullName);
            swagger.SwaggerDoc(ApiVersion, new OpenApiInfo
            {
                Title = ApiTitle,
                Version = ApiVersion
            });
        });
        return services;
    }

    public static IApplicationBuilder UserSharedFramework(this IApplicationBuilder app)
    {
        app.UseSwagger();
        app.UseSwaggerUI();
        app.UseReDoc(reDoc =>
        {
            reDoc.RoutePrefix = "docs";
            reDoc.SpecUrl($"/swagger/{ApiVersion}/swagger.json");
            reDoc.DocumentTitle = ApiTitle;
        });
        app.UseRouting();
        return app;
    }
}