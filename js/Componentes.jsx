
var Component = React.createClass({

    componentDidMount : function(){//Eventos despues de ser cargado el componente

        console.log('Componente fué montado');

    },

    componentWillMount : function(){//Eventos despues de ser cargado el componente

        console.log('Componente será montado');

    },

    getInitialState : function(){

        return{
            Info : 'Persona',
            clase: 'color_font_white'
        };
    },

    presion : function(event){
        return{}
    },

    render: function () {
        var Information = this.props.Data;

        return (

            <p className = {this.state.clase} onClick={this.presion}>
                Saludo a {this.state.Info}
                Saludo a {this.state.Info}
            </p>

        );
    }
});

React.render(<Component entrada = "Alejandro"/>, document.getElementById('dynamicTable'));