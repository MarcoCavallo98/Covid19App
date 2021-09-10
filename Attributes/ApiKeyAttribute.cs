using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Covid19App.Attributes
{
    [AttributeUsage(validOn: AttributeTargets.Class)]
    public class ApiKeyAttribute: Attribute, IAsyncActionFilter
    {

        private const string API_NAME = "APIKey";

        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            if (!context.HttpContext.Request.Headers.TryGetValue(API_NAME, out var sentApiKey))
            {
                context.Result = new ContentResult()
                {
                    StatusCode = 401,
                    Content = "You must provide an api key (APIKey)."
                };
                return;
            }

            var config = context.HttpContext.RequestServices.GetRequiredService<IConfiguration>();
            var correctApiKey = config.GetValue<string>(API_NAME);
            if (!sentApiKey.Equals(correctApiKey)) 
            {
                context.Result = new ContentResult()
                {
                    StatusCode = 401,
                    Content = "Api key is not valid."
                };
                return;
            }

            await next();
        }
    }
}
