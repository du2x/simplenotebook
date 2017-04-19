// see http://stackoverflow.com/questions/5180382/convert-json-data-to-a-html-table
// Builds the HTML Table out of myList.
export function buildHtmlTable(myList:any[]) {
  let columns:string[];
  columns=[];
  let res = '<table class="table">';
  let headerTr = '';

  for (var i = 0; i < myList.length; i++) {
      var rowHash = myList[i];
      for (var key in rowHash) {
          if (!columns.some(x=>x==key)) {
              columns.push(key);
              headerTr+='<th>'+key+'</th>';
          }
      }
  }
  res += "<tr>"+headerTr+"</tr>";

  for (var i = 0; i < myList.length; i++) {
    let row = '';
    for (var colIndex = 0; colIndex < columns.length; colIndex++) {
      var cellValue = myList[i][columns[colIndex]];
      if (cellValue == null) cellValue = "";
      row+='<td>'+cellValue+'</td>';
    }
    res += "<tr>"+row+"</tr>";
  }
  res += "</table>";
  return res;
}
