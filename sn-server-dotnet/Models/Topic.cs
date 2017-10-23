using System;
using System.Collections.Generic;
using Newtonsoft.Json.Linq;

namespace sn_server_dotnet.Models
{
    public class Topic
    {
        public string title { get; set; }
        public string filename { get; set; }
        public DateTime created { get; set; }

        public IList<Cell> cells{ get; set;}

        public Topic(JObject jobj, bool full=true){
            title = jobj.GetValue("title").ToString();
            filename = jobj.GetValue("filename").ToString();
            created = (DateTime)jobj.GetValue("created");
            cells = new List<Cell>();                         
            if (full){
                foreach(JObject obj in jobj.GetValue("cells")){
                    cells.Add(new Cell(obj));
                }
            }
        }
    }

    public class Cell{

        public string type { get; set; }
        public string content { get; set; }

        public string output { get; set; }

        public DateTime DateTime { get; set; }

        public Cell(JObject obj){
            content = (String) obj.GetValue("Text");
        }
    }
}
