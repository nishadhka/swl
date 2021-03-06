var chart; //global chart object
var todaystart = Date.parse("today"); // default starttime for everything
var todayend = Date.parse("next day"); // default endtime for everything
var elements = []; // array for selected properties in the chart view
var checkedValues = 0; // count for selected properties

//Hover function for every button on the site
$(".img-rounded").hover(
	function() {
		switch (this.getAttribute("id")) {
			case "overview":
				this.setAttribute('src', 'img/info_inverted.png');
				break;
			case "tempHum":
				this.setAttribute('src', 'img/temperature_inverted.png');
				break; 	
			case "no2":
				this.setAttribute('src', 'img/dust_inverted.png');
				break;
			case "co":
				this.setAttribute('src', 'img/dust_inverted.png');
				break;
			case "tnau_cbeTempHum":
				this.setAttribute('src', 'img/temperature_inverted.png');
				break; 	
			case "tnau_cbeWSpeed":
				this.setAttribute('src', 'img/wind_velocity_inverted.png');
				break;
			case "tnau_cbeWDire":
				this.setAttribute('src', 'img/wind_direction_inverted.png');
				break;
			case "tnau_cbeAtmPre":
				this.setAttribute('src', 'img/atm_pressure_inverted.png');
				break;
			case "download":
				this.setAttribute('src', 'img/download_inverted.png');
				break;
		}	
	}, function() {
		switch (this.getAttribute("id")) {
			case "overview":
				this.setAttribute('src', 'img/info.png');
				break;
			case "tempHum":
				this.setAttribute('src', 'img/temperature.png');
				break; 	
			case "no2":
				this.setAttribute('src', 'img/dust.png');
				break;
			case "co":
				this.setAttribute('src', 'img/dust.png');
				break;
			case "tnau_cbeTempHum":
				this.setAttribute('src', 'img/temperature.png');
				break;
			case "tnau_cbeWSpeed":
				this.setAttribute('src', 'img/wind_velocity.png');
				break;
			case "tnau_cbeWDire":
				this.setAttribute('src', 'img/wind_direction.png');
				break;
			case "tnau_cbeAtmPre":
				this.setAttribute('src', 'img/atm_pressure.png');
				break;
			case "download":
				this.setAttribute('src', 'img/download.png');
				break;
		}
	}
)

//Click handler for the buttons in the sensorbars
$(".img-rounded.sensorbar").click(function(){
	if (!selectedService) {
		$('#hint').css("visibility", "visible");
		$('#hint').text("Please select a station on the map!");
	} else {
		if(selectedService == "tnau_cbe") {
			$('#overviewModalLabel').append('<h3>'+tnau_cbeStationen[checkedStation]["name"]+'</h3>');
		}
		if(selectedService == "cosmcosm") {
			$('#overviewModalLabel').append('<h3>'+results.title+'</h3>');
		}
		$('#overviewModalTabs a:first').tab('show');
		$('#overviewModal').bigmodal("show");
	}
})

//Click handler for the download mangager
$('#download').click(function(){
	$('#downloadModal').modal("show");
})

$('#sensorbar').carousel({interval:false}); //initialize sensorbar

//If the modal is completly loaded add information
$('#overviewModal').on('shown', function(){

	//Here everything is prepared for tnau_cbe stations
	if (selectedService == "tnau_cbe") {
		
		//Build up the table head
		$('#tablehead').children("tr").remove();
		$('#tablehead').append('<tr><th>Date</th><th>Atmpospheric pressure (hpa)</th><th>Humidity (%)</th><th>Temperature (°C)</th><th>Wind direction (Deg)</th><th>Wind speed (kmph)</th></tr>');
		
		//Build up available observed properties for the diagram
		$('#multiselect-menu').children("li").remove();
		$('#multiselect-menu').append('<li><a><label class="checkbox"><input id="real" type="checkbox" value="Temperature">Temperature</input></label></a></li><li><a><label class="checkbox"><input id="real" type="checkbox" value="Humidity">Humidity</label></a></li><li><a><label class="checkbox"><input id="real" type="checkbox" value="ws">Wind Speed</label></a></li><li><a><label class="checkbox"><input id="real" type="checkbox" value="wd">Wind Direction</label></a></li><li><a><label class="checkbox"><input id="real" type="checkbox" value="ap">Atmospheric Pressure</label></a></li>');
		
		//Setup the Home screen with information
		$('#home').children("div").remove();
		$('#home').append('<div class="row-fluid"><div class="span6"><div class="span4"><h4>Stations profile:</h4><h4>Station type:</h4><h4>Disko:</h4><h4>Address:</h4></div><div class="span4"><h6>'+checkedStation+'</a></h6><h6>'+tnau_cbeStationen[checkedStation]["type"]+'</a></h6>'+tnau_cbeStationen[checkedStation]["disko"]+'</a></h6><address>'+tnau_cbeStationen[checkedStation]["address"]+'<br>'+tnau_cbeStationen[checkedStation]["plz"]+'</address></div></div><div class="span6"><img src="http://localhost/qualitySCHU/img/tnau_cbe.JPG" alt="some_text" width="50%" height="50%"></div></div>');
		
		//If it is a discontinuous station disable table and diagram tab because no measurements are provided online
		if(tnau_cbeStationen[checkedStation]["disko"] == 1) {
			$('#tableTabContent').attr('data-toggle', '');
			$('#tableTab').addClass('disabled');
			$('#diagramTabContent').attr('data-toggle', '');
			$('#diagramTab').addClass('disabled');
		} else {
			$('#overviewModalTabs a[href="#diagram"]').on('click', function(){
				$('#modalFooter').css('visibility', 'visible');
				buildDiagram();
				elements = [];
				checkedValues = 0;
			})

			$('#overviewModalTabs a[href="#table"]').on('click', function(){
				$('#modalFooter').css('visibility', 'visible');
			})
		}
		initCheckboxes();
	}

	//All COSM/AQE stuff is setup here
	if(selectedService == "cosmcosm") {

		//table head setup
		$('#tablehead').children("tr").remove();
		$('#tablehead').append('<tr><th>Date</th><th>CO (ppm)</th><th>Humidity (%)</th><th>NO<sub>2</sub> (ppm)</th><th>Temperature (°C)</th></tr>');

		//dropdown menu setup for diagram
		$('#multiselect-menu').children("li").remove();
		$('#multiselect-menu').append('<li><a><label class="checkbox"><input id="checkTemp" type="checkbox" value="Temperature">Temperature</input></label></a></li><li><a><label class="checkbox"><input id="checkHum" type="checkbox" value="Humidity">Humidity</label></a></li><li><a><label class="checkbox"><input id="real" type="checkbox" value="CO">CO</label></a></li><li><a><label class="checkbox"><input id="real" type="checkbox" value="NO2">NO<sub>2</sub></label></a></li>');

		//prepare home screen for selected AQE
		$('#home').children("div").remove();
		$('#home').append('<div class="row-fluid"><div class="span6"><div class="span4"><h4>Description:</h4><h4>Creator:</h4><h4>Cosm feed:</h4><h4>Status:</h4><h4>Domain:</h4><h4>Exposure:</h4><h4>Elevation:</h4><h4>Tags:</h4></div><div class="span4"><h4>'+results["description"]+'</h4><h4><a href="'+results["creator"]+'" target="_blank">AirQualityEgg</a></h4><h4><a href="https://cosm.com/feeds/'+results["id"]+'" target="_blank">'+results["id"]+'</a></h4><h4>live</h4><h4>'+results["location"]["domain"]+'</h4><h4>'+results["location"]["exposure"]+'</h4><h4>35m</h4><h4><span style="display:inline;" class="label label-info">'+results["tags"][0]+'</span> <span style="display:inline;" class="label label-info">'+results["tags"][1]+'</span></h4></div></div><div class="span6"></div></div>');
		initCheckboxes();

		$('#overviewModalTabs a[href="#diagram"]').on('click', function(){
			$('#modalFooter').css('visibility', 'visible');
			$('#dataAvailable')
			buildDiagram();
			elements = [];
			checkedValues = 0;
		})

		$('#overviewModalTabs a[href="#table"]').on('click', function(){
			$('#modalFooter').css('visibility', 'visible');
		})
	}

	//Default chart setup
	chart = new CanvasJS.Chart("chartContainer",
	{
		zoomEnabled: true,
		axisX:{
			labelAngle: -30,
			gridColor: "Silver",
			tickColor: "silver",
			valueFormatString: "DD-MMM-HH:mm",
			title: "UTC",
		},
		theme: "theme1",
		axisY: {
			gridColor: "Silver",
			tickColor: "silver",
			titleFontColor: "LightSkyBlue",
			title: "",
		},
		axisY2:{ 
			title: "",
			gridColor: "Silver",
			tickColor: "silver",
    		titleFontColor: "LightSeaGreen",
			},

		data: diagramDataDummy 
	});
	
	chart.render();

	//just dummy data for the chart because it must have empty data to render
	var diagramDataDummy = [];
	var dataSeriesDummy = { type: "line" };
	var dataPointsDummy = [];

	dataSeriesDummy.dataPoints = dataPointsDummy;
	diagramDataDummy.push(dataSeriesDummy);

	//daterange picker setup for the table view
	$('#reportrangetable').daterangepicker({
        ranges: {
            'Today': ['today', 'next day'],
            'Yesterday': ['yesterday', 'today'],
            'Last 7 Days': [Date.today().add({ days: -6 }), 'today'],
            'Last 30 Days': [Date.today().add({ days: -29 }), 'today'],
            'This Month': [Date.today().moveToFirstDayOfMonth(), Date.today().moveToLastDayOfMonth()],
            'Last Month': [Date.today().moveToFirstDayOfMonth().add({ months: -1 }), Date.today().moveToFirstDayOfMonth().add({ days: -1 })]
        }
    }, function(start, end) {
        $('#reportrangetable span').html(start.toString('MMM. d, yyyy') + ' - ' + end.toString('MMM. d, yyyy'));
        $('.trbody').empty();
        updateTable(start,end);
    });
    
    //daterange picker setup for the diagram view
    $('#reportrangediagram').daterangepicker({
        ranges: {
            'Today': ['today', 'next day'],
            'Yesterday': ['yesterday', 'today'],
            'Last 7 Days': [Date.today().add({ days: -6 }), 'today'],
            'Last 30 Days': [Date.today().add({ days: -29 }), 'today'],
            'This Month': [Date.today().moveToFirstDayOfMonth(), Date.today().moveToLastDayOfMonth()],
            'Last Month': [Date.today().moveToFirstDayOfMonth().add({ months: -1 }), Date.today().moveToFirstDayOfMonth().add({ days: -1 })]
        }
    }, function(start, end) {
    	todaystart = start;
    	todayend = end;
        $('#reportrangediagram span').html(start.toString('MMM. d, yyyy') + ' - ' + end.toString('MMM. d, yyyy'));
        buildDiagram();
    });
  
  	//default shown values on first setup is set to today
  	$('#reportrangetable span').html(Date.today().toString('MMM. d, yyyy') + ' - ' + Date.parse('next day').toString('MMM. d, yyyy'));
  	$('#reportrangediagram span').html(Date.today().toString('MMM. d, yyyy') + ' - ' + Date.parse('next day').toString('MMM. d, yyyy'));  
})

//Hide footer because it makes no sense on the home tab
$('#overviewModalTabs a[href="#home"]').on('click', function(){
	$('#modalFooter').css('visibility', 'hidden');
})

//If the user closes the overviewModal reset all specific and used variables to default values
$('#overviewModal').on('hidden', function(){
	elements = [];
	checkedValues = 0;
	$('#tablebody').children('tr').remove();
	$('#modalFooter').css('visibility', 'hidden');
	$('#tableTabContent').attr('data-toggle', 'tab');
	$('#tableTab').removeClass('disabled');
	$('#diagramTabContent').attr('data-toggle', 'tab');
	$('#diagramTab').removeClass('disabled');
	$('#overviewModalLabel').children('h3').remove();
	$('#home').children("div").remove();
});

//Dont close dropdown menu after selecting an entry
$('.dropdown-menu').on('click', function(e){
	if($(this).hasClass('dropdown-menu-form')){
	    e.stopPropagation();
	}
});

//Click handler for every entry in the dropdown menu
function initCheckboxes() {
	$('.checkbox').on('click', function(e){
	
		if(e.target.checked)
		{
			checkedValues ++;
			elements.push(e.target.defaultValue.toLowerCase());
		}
		else
		{
			if(e.target.control)
			{
				checkedValues ++;
				checkedValues --;
			}
			else
			{
				checkedValues --;
				elements.splice(elements.indexOf(e.target.defaultValue.toLowerCase()),1);	
			}
		}
	
		buildCaption();
		checkOptions();
		buildDiagram();
	});	
}

//This function checks if observed properties are chosen in the dropdown menu on the diagram tab. And if so add the chosen stuff to the diagram
function buildDiagram() {
	if (elements != "")
	{
		addToDiagram(elements,todaystart,todayend);		
	}
}

//Builds the caption for the dropdown menu
function buildCaption() {
	var caption="";
	$('.btn-group input[type="checkbox"]').each(function(){
		if (this.checked) {
			if (caption == "") {
				caption = caption + $(this).context.defaultValue;
			} else {
				caption = caption +","+$(this).context.defaultValue;	
			}
		}
		if (caption == "") {
			$('#dropdown-multiselect').text("None selected ").append('<span class="caret"></span>');	
		} else {
			$('#dropdown-multiselect').text(caption+" ").append('<span class="caret"></span>');	
		}
	});	
}

//Check selected dropdown menu options and disable the unchecked if two are selected
function checkOptions() {
	if (checkedValues == 2) {
		$('.btn-group input[type="checkbox"]').each(function(){
			if (!this.checked) {
				this.disabled = true;
			} else {
				this.disabled = false;	
			}
		});
	} else {
		$('.btn-group input[type="checkbox"]').each(function(){
			if (this.disabled) {
				this.disabled = false;
			}
		});	
	}
}

var options = {};
var selectedServiceToDownload;
var selectedProceduresToDownload;
var selectedObservedProperties;
var selectedStartdateToDownload;
var selectedEnddateToDownload;
var downloadURLJSON;
var wizard = $("#downloadWizard").wizard(options);

//Click handler for download manger and opens the wizard
$('#download').click(function(){
	$("#service").select2({
    	placeholder: "Select a service",
    	allowClear: true
	});	
	wizard.show();	
});

//If the wizard is closed set all back to default
wizard.on("reset",function(wizard){
	selectedServiceToDownload = "";
	selectedProceduresToDownload = [];
	selectedObservedProperties = [];
	$('#errorSection').addClass('hide');
	$('#procedures').select2('val','');
	$('#obsProp').select2('val','');
	$('#procedures').children('optgroup').remove();
	$('#obsProp').children('option').remove();
})

//If submit is clicked on the last page you you end up here
//and the download links are prepared
wizard.on("submit", function(wizard) {

	downloadURLJSON = "http://localhost/istsos/wa/istsos/services/"+selectedServiceToDownload+"/operations/getobservation/offerings/temporary/procedures/"+selectedProceduresToDownload+"/observedproperties/"+selectedObservedProperties+"/eventtime/"+selectedStartdateToDownload+"/"+selectedEnddateToDownload+"";
	$('#hrefJSON').attr('href',downloadURLJSON);

	downloadURLXML = "http://localhost/istsos/"+selectedServiceToDownload+"?service=SOS&request=GetObservation&offering=temporary&procedure="+selectedProceduresToDownload+"&srsName=4326&observedProperty="+selectedObservedProperties+"&responseFormat=text/xml&service=SOS&version=1.0.0&eventTime="+selectedStartdateToDownload+"/"+selectedEnddateToDownload+"";
	$('#hrefXML').attr('href',downloadURLXML);

	downloadURLPlain = "http://localhost/istsos/"+selectedServiceToDownload+"?service=SOS&request=GetObservation&offering=temporary&procedure="+selectedProceduresToDownload+"&srsName=4326&observedProperty="+selectedObservedProperties+"&responseFormat=text/plain&service=SOS&version=1.0.0&eventTime="+selectedStartdateToDownload+"/"+selectedEnddateToDownload+"";
	$('#hrefPlain').attr('href',downloadURLPlain);

	downloadURLXJSON = "http://localhost/istsos/"+selectedServiceToDownload+"?service=SOS&request=GetObservation&offering=temporary&procedure="+selectedProceduresToDownload+"&srsName=4326&observedProperty="+selectedObservedProperties+"&responseFormat=text/x-json&service=SOS&version=1.0.0&eventTime="+selectedStartdateToDownload+"/"+selectedEnddateToDownload+"";
	$('#hrefXJSON').attr('href',downloadURLXJSON);

	downloadURLSensorML = "http://localhost/istsos/"+selectedServiceToDownload+"?service=SOS&request=GetObservation&offering=temporary&procedure="+selectedProceduresToDownload+"&srsName=4326&observedProperty="+selectedObservedProperties+"&responseFormat=text/xml;subtype='sensorML/1.0.0'&service=SOS&version=1.0.0&eventTime="+selectedStartdateToDownload+"/"+selectedEnddateToDownload+"";
	$('#hrefSensorML').attr('href',downloadURLSensorML);

	setTimeout(function() {
		wizard.trigger("success");
		wizard.hideButtons();
		wizard._submitting = false;
		wizard.showSubmitCard("success");
	}, 2000);
});

//This function checks if something is selected on the first page (service selected)
function somethingSelected(card) {
	ret = {
		status: true
	};

	if ($("#service").select2("val") == "") {
		ret.status = false;
		ret.msg = "Nothing selected!";
	} else {
		selectedServiceToDownload = $("#service").select2("val");
	}
	
	return ret;
}

//This function checks if something is selected on the second page (procedure(s) selected)
function somethingSelected2(card)
{
	ret = {
		status: true
	};
	if ($("#procedures").select2("val") == "") {
		$('#errorSection').removeClass('hide');
		ret.status = false;
	} else {
		$('#errorSection').addClass('hide');
		selectedProceduresToDownload = $("#procedures").select2("val");
	}

	return ret;
}

//This function checks if something is selected on the third page (observed properties selected)
function somethingSelected3(card)
{
	ret = {
		status: true
	};
	if ($('#obsProp').select2("val") == "") {
		$('#errorSectionObsProp').removeClass('hide');
		ret.status = false;
	} else {
		$('#errorSectionObsProp').addClass('hide');
		selectedObservedProperties = $("#obsProp").select2("val");
	}

	return ret;
}

//This function builds up the available procedures depending on the selected service on the first page
function loadAvailableStations(card)
{
	$("#procedures").select2({
    	placeholder: "Select some procedures",
    	allowClear: true
	});
	if (selectedServiceToDownload == "tnau_cbe") {
		$('#procedures').children('optgroup').remove();
		$('#procedures').children('option').remove();

		jQuery.ajax({
			url: 'http://localhost/istsos/wa/istsos/services/tnau_cbe/procedures/operations/getlist',
	        type: 'get',
	        dataType: "json",
	        success:function(data3){
	        	for(var i = 0; i < data3.data.length; i++)
	        	{
	        		$('#procedures').append('<option value='+data3.data[i]["name"]+'>'+data3.data[i]["name"]+'</option>');
	        	}
	        }
	    });
	}
	if (selectedServiceToDownload == "cosmcosm") {
		$('#procedures').children('optgroup').remove();
		$('#procedures').children('option').remove();

		jQuery.ajax({
			url: 'http://giv-geosoft2d.uni-muenster.de/istsos/wa/istsos/services/cosmcosm/procedures/operations/getlist',
	        type: 'get',
	        dataType: "json",
	        success:function(data3){
	        	for(var i = 0; i < data3.data.length; i++)
	        	{
	        		$('#procedures').append('<option value='+data3.data[i]["name"]+'>'+data3.data[i]["name"]+'</option>');
	        	}
	        }
	    });
	}
}

//This function loads all available observed properties depending on the chosen service
function loadObservedProperties(card) {
	$('#obsProp').children('option').remove();
	$("#obsProp").select2({
    	placeholder: "Select some observed properties",
    	allowClear: true
	});
	if (selectedServiceToDownload == "tnau_cbe") {
		$("#obsProp").append('<option value="urn:ogc:def:parameter:x-istsos:1.0:tnau:aws:air:temperature">Temperature</option><option value="urn:ogc:def:parameter:x-istsos:1.0:tnau:aws:relative:humidity">Humidity</option><option value="urn:ogc:def:parameter:x-istsos:1.0:tnau:aws:wind:speed">Wind Speed</option><option value="urn:ogc:def:parameter:x-istsos:1.0:tnau:aws:wind:direction">Wind Direction</option><option value="urn:ogc:def:parameter:x-istsos:1.0:tnau:aws:atmospheric:pressure">Atmopsheric Pressure</option>');
	}
	if (selectedServiceToDownload == "cosmcosm") {
		$("#obsProp").append('<option value="urn:ogc:def:parameter:x-istsos:1.0:meteo:air:temperature">Temperature</option><option value="urn:ogc:def:parameter:x-istsos:1.0:meteo:air:humidity">Humidity</option><option value="urn:ogc:def:parameter:x-istsos:1.0:meteo:air:co">Carbon Monoxide</option><option value="urn:ogc:def:parameter:x-istsos:1.0:meteo:air:no2">Nitrogen Dioxide</option>');
	}
}

//This function loads the timeframe page
function loadTimeFrame(card) {
	//sets the start and enddate to the default date (todaystart)
	selectedStartdateToDownload = todaystart.toString('yyyy-MM-ddTHH:mm:ss');
	selectedStartdateToDownload = selectedStartdateToDownload + getTz(todaystart.getTimezoneOffset());
	selectedEnddateToDownload = todayend.toString('yyyy-MM-ddTHH:mm:ss');
	selectedEnddateToDownload = selectedEnddateToDownload + getTz(todayend.getTimezoneOffset());
	$('#reportrangeDownload').daterangepicker({
        ranges: {
            'Today': ['today', 'next day'],
            'Yesterday': ['yesterday', 'today'],
            'Last 7 Days': [Date.today().add({ days: -6 }), 'today'],
            'Last 30 Days': [Date.today().add({ days: -29 }), 'today'],
            'This Month': [Date.today().moveToFirstDayOfMonth(), Date.today().moveToLastDayOfMonth()],
            'Last Month': [Date.today().moveToFirstDayOfMonth().add({ months: -1 }), Date.today().moveToFirstDayOfMonth().add({ days: -1 })]
        }
    }, function(start, end) {
    	selectedStartdateToDownload = start.toString('yyyy-MM-ddTHH:mm:ss');
		selectedStartdateToDownload = selectedStartdateToDownload + getTz(start.getTimezoneOffset());
		selectedEnddateToDownload = end.toString('yyyy-MM-ddTHH:mm:ss');
		selectedEnddateToDownload = selectedEnddateToDownload + getTz(end.getTimezoneOffset());
        $('#reportrangeDownload span').html(start.toString('MMM. d, yyyy') + ' - ' + end.toString('MMM. d, yyyy'));
    });

    $('#reportrangeDownload span').html(Date.today().toString('MMM. d, yyyy') + ' - ' + Date.parse('next day').toString('MMM. d, yyyy'));
}

//Click handler for both buttons on the success landing page
wizard.el.find(".wizard-success .download-more-data").click(function() {
	wizard.reset();

});
wizard.el.find(".wizard-success .im-done").click(function() {
	wizard.reset().close();
});
