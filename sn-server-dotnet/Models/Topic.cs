using System;
using System.Collections.Generic;
using Newtonsoft.Json.Linq;

namespace sn_server_dotnet.Models
{
    public class Topic
    {
        public string Title { get; set; }
        public string Filename { get; set; }
        public DateTime Created { get; set; }

        public IList<Cell> Cells{ get; set;}

        public Topic(JObject jobj, bool full=true){
            Title = jobj.GetValue("title").ToString();
            Filename = jobj.GetValue("filename").ToString();
            Created = (DateTime)jobj.GetValue("created");
            Cells = new List<Cell>();                         
            if (full){
                foreach(JObject obj in jobj.GetValue("cells")){
                    Cells.Add(new Cell(obj));
                }
            }
        }
    }

    public class Cell{

        public string Type { get; set; }
        public string Content { get; set; }

        public string Output { get; set; }

        public DateTime DateTime { get; set; }

        public Cell(JObject obj){
            Content = (String) obj.GetValue("Text");
        }
    }
}
