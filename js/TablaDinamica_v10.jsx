/**
* author Elihu Alejandro Cruz Albores
* version 1.9
* Run with index.html
*/

var go = true;
var FileName = "json/Information.json";

function getDatos (){
    return  (function () {//Petición a servidor para JSON con datos

        var JSON = null;
        $.ajax({
            'async': false,
            'global': false,
            'type' : "POST",
            'url': FileName,
            'dataType': "json",
            'success': function (data) {
                JSON = data;
            }
        });
        return JSON;
    })();
};

function Update(){

    var Valores = getDatos();
    React.render(<Table Data={Valores} />,document.getElementById('dynamicTable'));
};

var Table = React.createClass({

    componentDidMount : function(){//Eventos despues de ser cargado el componente

        setInterval(function(){Update();},3000);

    },

    componentWillMount : function(){//Eventos despues de ser cargado el componente

        console.log('Hola mundo!');

    },

    render: function () {
        var Information = this.props.Data;

        return (

            <table  className = "table table-hover">

                <TableHead Head = {Information} />
                <TableBody Body = {Information} />

            </table>

        );
    }
});

//Creacion de Contenido Filas
var TableHead = React.createClass({
    render: function () {

        var row = this.props.Head.table_head;

        return (
            <tr id="Cabecera">
            {
                row.map(function(data,id) {
                    return(
                        <th key={id}>
                            <p>
                            	<center> {data.title} </center>
                            </p>
                        </th>
                    )
                })
            }
            </tr>
        );
    },
});

//Creacion de Cuerpo de tabla
var TableBody = React.createClass({

    render: function () {

        var row = this.props.Body.table_body;
        var attribute = this.props.Body.table_head;

        return (
            <tbody id="Cuerpo">
            {
                row.map(function(data, id) {

                    return(
                        <Row key={id}  Information={data} Attr={attribute}/>
                    );
                })
            }
            </tbody>
        );
    },
});

//Informacion de las columnas
var Row = React.createClass({
    render: function () {
    	
        var row = this.props.Information;
        var attribute = this.props.Attr;

        return (

            <tr >
            {
                row.map(function(data, id) {

                    if(attribute[id].link != ""){

                        return(
                        	<RowLink key={id} enlace={attribute[id].link} clase={attribute[id].class} informacion={data}/>
                        );
                    }
                    else{
                        return(
   							<RowNormal key={id} clase = {attribute[id].class} informacion = {data}/>
                        );
                    }
                })
            }
        	</tr>
        );
    }
});

//Contenido con hipervinculo
var RowLink = React.createClass({

	render : function(){
		return(
            <td>
                <a href = {this.props.enlace}>
                    <p className={this.props.clase}> {this.props.informacion} </p>
                </a>
            </td>
		);
	}
});

//Texto sin hipervinculo
var RowNormal = React.createClass({
	render :function(){
		return(
            <td>
                <p className={this.props.clase}> {this.props.informacion} </p>
            </td>
		);
	}
});

if(go){go=false;Update();}
