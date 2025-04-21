
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Api
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);


            // CORS policy 
            var corsPolicyName = "AllowFrontend";

            builder.Services.AddCors(options =>
            {
                options.AddPolicy(name: corsPolicyName,
                    policy =>
                    {
                        policy.WithOrigins("http://localhost:5173")
                            .AllowAnyHeader()
                            .AllowAnyMethod();
                    });
            });

            // Configuration
            builder.Configuration
                .AddJsonFile("appsettings.local.json", optional: true, reloadOnChange: true);
           
            // Add services to the container.
            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddDbContext<AppDbContext>(opt => opt.UseSqlServer(
                builder.Configuration.GetConnectionString("default"),
                b => b.MigrationsAssembly(nameof(Api))
            ));

            var app = builder.Build();

           

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();
            app.UseCors(corsPolicyName);
            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
