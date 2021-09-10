using Covid19App.Configurations;
using Covid19App.Model;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;


namespace Covid19App.Services
{
    public class CovidService
    {
        private IMongoCollection<StateInfo> mongoCollection;
        public CovidService(ICovidDBConfiguration conf) 
        {
            MongoClient client = new MongoClient(conf.ConnString);
            var database = client.GetDatabase(conf.DBName);
            mongoCollection = database.GetCollection<StateInfo>(conf.CollectionName);
        }

        public async Task<IList<StateInfo>> GetAllYesterdayData() 
        {
            DateTime yesterday = new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day - 1, 0, 0, 0, DateTimeKind.Utc);
            IList<StateInfo> infos = await mongoCollection.Find(d => yesterday.Date == d.Date).ToListAsync();

            return infos;
        }

        public async Task<IList<StateInfo>> GetLastFiveDaysInfos(string iso2) 
        {
            DateTime[] dates = new DateTime[5];

            for(int i = 1; i <= 5; i++)
                dates[i-1] = new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day - i, 0, 0, 0, DateTimeKind.Utc);
            
            IList<StateInfo> infos = await mongoCollection
                                            .Find(d => dates.Contains(d.Date) && d.ISO2.Contains(iso2.ToUpper())).ToListAsync();

            return infos;
        }

    }
}
