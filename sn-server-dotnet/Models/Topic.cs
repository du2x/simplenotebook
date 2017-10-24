using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;
using Newtonsoft.Json.Linq;

namespace sn_server_dotnet.Models
{
    public class Topic
    {
        public string title { get; set; }
        public string filename { get; set; }
        public DateTime created { get; set; }
        public DateTime modified { get; set; }
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

        public Topic(string title)
        {
            this.title = title;
            this.filename = GenerateSlug(title);
            this.created = DateTime.Now;
        }

        public static string GenerateSlug(string phrase)         
        {             
            // from https://stackoverflow.com/questions/2920744/url-slugify-algorithm-in-c
            byte[] bytes = System.Text.Encoding.GetEncoding("UTF-8").GetBytes(phrase); 
            string str = System.Text.Encoding.ASCII.GetString(bytes).ToLower();  // remove accents           
            // invalid chars           
            str = Regex.Replace(str, @"[^a-z0-9\s-]", ""); 
            // convert multiple spaces into one space   
            str = Regex.Replace(str, @"\s+", " ").Trim(); 
            // cut and trim 
            str = str.Substring(0, str.Length <= 45 ? str.Length : 45).Trim();   
            str = Regex.Replace(str, @"\s", "-"); // hyphens   
            return str; 
        }         

    }

    public class Cell{

        public string type { get; set; }
        public string content { get; set; }

        public string output { get; set; }

        public DateTime datetime { get; set; }

        public Cell(JObject obj){
            type = (String) obj.GetValue("type");
            content = (String) obj.GetValue("content");
            output = (String) obj.GetValue("output");
            datetime = (DateTime) obj.GetValue("datetime");
        }
    }
}
