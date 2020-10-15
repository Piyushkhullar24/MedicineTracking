using Microsoft.Extensions.DependencyInjection;

namespace MedicineTracking.ServiceExtensions
{
    public static class ServiceExtensions
    {
        // currently allowing all origins, methods and header. make changes in allowanymethod, allowanyheader etc accordingly.
        public static void ConfigureCors(this IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                    builder => builder.AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader());
            });
        }
    }
}
