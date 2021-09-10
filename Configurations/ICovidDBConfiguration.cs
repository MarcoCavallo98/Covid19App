using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Covid19App.Configurations
{
    public interface ICovidDBConfiguration
    {
        public string ConnString { get; set; }
        public string DBName { get; set; }
        public string CollectionName { get; set; }

    }
}
