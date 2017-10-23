using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using sn_server_dotnet.Models;

namespace sn_server_dotnet.Controllers
{
    [Route("api/apuracoes")]
    public class ValuesController : Controller
    {
        // GET api/apuracoes/
        [HttpGet]
        public string Get()
        {
            List<Topic> list = new List<Topic>();
            string[] entries = Directory.GetFileSystemEntries(
                "./data", "*", SearchOption.TopDirectoryOnly);
            foreach(string entry in entries){
                JObject o1 = JObject.Parse(System.IO.File.ReadAllText(entry));
                list.Add(new Topic(o1));
            }            
            list.Sort((x, y) => -1 * DateTime.Compare(x.Created, y.Created));
            return JsonConvert.SerializeObject(list);
        }

        // GET api/apuracoes/topic.json
        [HttpGet("{filename}")]
        public string Get(string filename)
        {
            JObject o1 = JObject.Parse(System.IO.File.ReadAllText("data/" + filename));
            return JsonConvert.SerializeObject(new Topic(o1));
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
