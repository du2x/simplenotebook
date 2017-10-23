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
    [Route("api/topics")]
    public class TopicsController : Controller
    {
        // GET api/topics/
        [HttpGet]
        public string Get()
        {
            List<Topic> list = new List<Topic>();
            string[] entries = Directory.GetFileSystemEntries(
                "./data", "*", SearchOption.TopDirectoryOnly);
            foreach(string entry in entries){
                JObject o1 = JObject.Parse(System.IO.File.ReadAllText(entry));
                list.Add(new Topic(o1, false));
            }            
            list.Sort((x, y) => -1 * DateTime.Compare(x.created, y.created));
            return JsonConvert.SerializeObject(list);
        }

        // GET api/topics/topic.json
        [HttpGet("{filename}")]
        public string Get(string filename)
        {
            JObject o1 = JObject.Parse(System.IO.File.ReadAllText("data/" + filename));
            return JsonConvert.SerializeObject(new Topic(o1));
        }

        // POST api/topics/{title}
        [HttpPost("{title}")]
        public void Post(string title)
        {
            Topic topic = new Topic(title);
            string stopic = JsonConvert.SerializeObject(topic);
            System.IO.File.WriteAllText(@"data/" + topic.filename, stopic);
        }

        // PUT api/topics/{filename}
        [HttpPut("{filename}")]
        public void Put(string filename, [FromBody]JObject jtopic)
        {
            Topic topic = new Topic(jtopic);
            string stopic = JsonConvert.SerializeObject(topic);
            System.IO.File.WriteAllText(@"data/" + filename, stopic);
        }
    }
}
