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
using System.Text;

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
            NpgsqlDataAdapter da = new NpgsqlDataAdapter((string)sql.GetValue("sql"), conn);
            DataSet ds = new DataSet();            
            da.Fill(ds);
            conn.Close();
            string result = JsonConvert.SerializeObject(ToDictionary(ds.Tables[0]), Formatting.Indented).Replace("\"", "");
            return result;
        }

        public static IEnumerable<Dictionary<string, object>> ToDictionary(DataTable table)
        {
            string[] columns = table.Columns.Cast<DataColumn>().Select(c=>c.ColumnName).ToArray();
            IEnumerable<Dictionary<string, object>>  result = table.Rows.Cast<DataRow>()
                    .Select(dr => columns.ToDictionary(c => c, c=> dr[c]));
            return result;
        }        
    }
}
