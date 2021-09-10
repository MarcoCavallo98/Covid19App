using Covid19App.Attributes;
using Covid19App.Model;
using Covid19App.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Covid19App.Controllers
{
    [ApiKey]
    [Route("api/[controller]")]
    [ApiController]
    public class StateInfoController : ControllerBase
    {
        private CovidService _service;
        public StateInfoController(CovidService service)
        {
            _service = service;
        }

        [HttpGet("yesterday")]
        public async Task<ActionResult<IList<StateInfo>>> GetYesterdayData() 
        {
            IList<StateInfo> infos = await _service.GetAllYesterdayData();

            return Ok(infos);
        }

        [HttpGet("lastFiveDays/{iso2}")]
        public async Task<ActionResult<IList<StateInfo>>> GetLastFiveDaysInfosForState(string iso2) 
        {
            IList<StateInfo> infos = await _service.GetLastFiveDaysInfos(iso2);

            if (infos.Count == 0)
                return NotFound();
            else
                return Ok(infos);
        }
    }
}
