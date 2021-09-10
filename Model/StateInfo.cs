using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Covid19App.Model
{
    [BsonIgnoreExtraElements]
    public class StateInfo
    {
        [BsonElement("country")]
        public string Country { get; set; }
        [BsonElement("country_iso2s")]
        public List<string> ISO2 { get; set; }
        [BsonElement("population")]
        public long Population { get; set; }
        [BsonElement("date")]
        [BsonDateTimeOptions(Kind = DateTimeKind.Utc)]
        public DateTime Date { get; set; }
        [BsonElement("confirmed_daily")]
        public long ConfirmedDaily { get; set; }
        [BsonElement("deaths_daily")]
        public long DeathsDaily { get; set; }
    }
}
