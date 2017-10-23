using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using sn_server_dotnet.Models;
using Npgsql;
using System.Data;
using Npgsql.Schema;
using Newtonsoft.Json;

namespace sn_server_dotnet.Controllers
{
    [Route("api/command/execute")]
    public class CommandController : Controller
    {
        // POST api/command/execute
        [HttpPost]
        public string Post([FromBody] JObject sql)
        {
            NpgsqlConnection conn = new NpgsqlConnection("Server=127.0.0.1;User Id=simplenotebook; " + 
            "Password=mypassword;Database=simplenotebook;");            
            conn.Open();            
            NpgsqlCommand cmd = new NpgsqlCommand((string)sql.GetValue("sql"), conn);
            NpgsqlDataReader dr = cmd.ExecuteReader();       
            List<Dictionary<string, object>> rows = new List<Dictionary<string, object>>();
            Dictionary<string, object> row;
            while (dr.Read()) {
                row = new Dictionary<string, object>();
                foreach (NpgsqlDbColumn col in dr.GetColumnSchema())
                {
                    row.Add(col.ColumnName, dr.GetFieldValue<Object>((int)col.ColumnOrdinal) );
                }
                rows.Add(row);
            }           
            dr.Close();
            conn.Close();          
            string res = JsonConvert.SerializeObject(rows);
            return  res;
        }
    }
}
