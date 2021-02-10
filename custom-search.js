$(document).ready(function() {

	/**
         * Convert Eastern String to Western
         * @param  {String} str Input string to be converted
         * @return {String}     Output string
         */
        function enString(str)
            {
                str = str.toLowerCase();
                str = str.replace(/[\xc0-\xc5\xe0-\xe5\u0100-\u0105\u0386\u0391\u03ac\u03b1\u0410\u0430\u05d0]/g,'a');
                str = str.replace(/[\xc8-\xcb\xe8-\xeb\u0116-\u011b\u0112\u0113\u0388\u0395\u03ad\u03b5\u042d\u044d]/g,'e');
                str = str.replace(/[\xa1\xcc-\xcf\xec-\xef\u0128-\u012b\u012e-\u0132\u013a\u0389\u038a\u0390\u0397\u0399\u03aa\u03ae\u03af\u03b7\u03b9\u03ca\u0418\u0438]/g,'i');
                str = str.replace(/[\xd2-\xd6\xd8\xf0\xf2-\xf6\xf8\u014d\u014c\u0150\u0151\u038c\u038f\u039f\u03a9\u03bf\u03c9\u03cc\u03ce\u041e\u043e]/g,'o');
                str = str.replace(/[\xb5\xd9-\xdc\xf9-\xfc\u0171\u0173\u0168-\u0170\u0423\u0443]/g,'u');
                str = str.replace(/[\u0392\u03b2\u05d1]/g,'b');
                str = str.replace(/[\xc7\xe7\u0106-\u010d\u0147\u0148\u05da\u05db]/g,'c');
                str = str.replace(/[\xd0\u010e-\u0111\u0394\u03b4\u05d3]/g,'d');
                str = str.replace(/[\u03a6\u03c6]/g,'f');
                str = str.replace(/[\u011c-\u0123\u0393\u03b3\u05d2]/g,'g');
                str = str.replace(/[\u0124-\u0127\u05d4]/g,'h');
                str = str.replace(/[\u0134\u0135]/g,'j');
                str = str.replace(/[\u0136\u0137\u039a\u03ba\u05d7\u05e7]/g,'k');
                str = str.replace(/[\u0139-\u013e\u0141\u0142\u039b\u03bb\u05dc]/g,'l');
                str = str.replace(/[\u039c\u03bc\u05dd\u05de]/g,'m');
                str = str.replace(/[\xd1\xf1\u0143-\u0148\u039d\u03bd\u05df\u05e0]/g,'n');
                str = str.replace(/[\u0154-\u0159\u03a1\u03c1\u05e8]/g,'r');
                str = str.replace(/[\u03a0\u03c0\u05e3\u05e4]/g,'p');
                str = str.replace(/[\x8a\x9a\xdf\u015a-\u0161\u03a3\u03c2\u03c3\u05e1]/g,'s');
                str = str.replace(/[\u0162-\u0167\u021a\u021b\u03a4\u03c4\u05d8\u05ea]/g,'t');
                str = str.replace(/[\u05d5]/g,'v');
                str = str.replace(/[\u03be\u039e]/g,'x');
                str = str.replace(/[\x9f\xdd\xfd\xff\u038e\u03a5\u03ab\u03b0\u03c5\u03cb\u03cd\u05d9]/g,'y');
                str = str.replace(/[\x9e\u0179-\u017e\u0396\u03b6\u05d6]/g,'z');
                str = str.replace(/[\u05e2]/g,'aa');
                str = str.replace(/[\xc6\xe6]/g,'ae');
                str = str.replace(/[\u03a7\u03c7]/g,'ch');
                str = str.replace(/[\u039e\u03be\u0152\u0153]/g,'oe');
                str = str.replace(/[\xde\xfe\u0398\u03b8]/g,'th');
                str = str.replace(/[\u05e5\u05e6]/g,'ts');
                str = str.replace(/[\u03c8\u03a8\u0398\u03b8]/g,'ps');
                str = str.replace(/[\u05e9]/g,'sh');
                str = str.replace(/[\xdf]/g,'sz');
                str = str.replace(/[^a-z 0-9 \-]+/g,'');
                //str = str.replace(/\s+/g, "-");
                //str = str.replace(/\--+/g, "-");
                return str;       
            };

        /**
         * Disable enter submit form
         */
        $(document).keypress(
          function(event){
            if (event.which == '13') {
              event.preventDefault();
            }
        });

        /**
         * Auto completed widget Object
         * Uses: http://jqueryui.com/autocomplete/#combobox
         */
        $.widget( "custom.combobox", {
          _create: function() {
            this.wrapper = $( "<span>" )
            .addClass( "custom-combobox" )
            .insertAfter( this.element );

            this.element.hide();
            this._createAutocomplete();
            //this._createShowAllButton();
          },

          _createAutocomplete: function() {
            var selected = this.element.children( ":selected" ),
            value = selected.val() ? selected.text() : "";

            this.input = $( "<input>" )
            .appendTo( this.wrapper )
            .val( value )
            .attr( "placeholder", this.element.attr("placeholder") )
            .addClass( "input w-input" ) //custom-combobox-input ui-widget ui-widget-content ui-state-default ui-corner-left" )
            .autocomplete({
              delay: 0,
              minLength: 0,
              source: $.proxy( this, "_source" )
            })
            .tooltip({
              classes: {
                "ui-tooltip": "ui-state-highlight"
              }
            });

            // Reuse classed
            this.element.each(function() {
              console.log("this", this);
              // var elClassList = wrapperElement.classList()
            });            

            this._on( this.input, {
              autocompleteselect: function( event, ui ) {
                ui.item.option.selected = true;
                this._trigger( "select", event, {
                  item: ui.item.option
                });
                // event will trigger also
                console.log("autocompleteselect", this.element.val());
                // calcTotal();
                // setClietData($(this.element));
              },

              autocompletechange: "_removeIfInvalid"
            });
          },

          _createShowAllButton: function() {
            var input = this.input,
            wasOpen = false;

            $( "<a>" )
            .attr( "tabIndex", -1 )
            .attr( "title", "Show All Items" )
            .tooltip()
            .appendTo( this.wrapper )
            .button({
              icons: {
                primary: "ui-icon-triangle-1-s"
              },
              text: false
            })
            .removeClass( "ui-corner-all" )
            .addClass( "custom-combobox-toggle ui-corner-right" )
            .on( "mousedown", function() {
              wasOpen = input.autocomplete( "widget" ).is( ":visible" );
            })
            .on( "click", function() {
              input.trigger( "focus" );

            // Close if already visible
            if ( wasOpen ) {
              return;
            }

            // Pass empty string as value to search for, displaying all results
            input.autocomplete( "search", "" );
            });
          },          

          _source: function( request, response ) {
            var matcher = new RegExp( $.ui.autocomplete.escapeRegex(request.term), "i" );
            response( this.element.children( "option" ).map(function() {
              var text = $( this ).text();
              var text_en = enString(text);
              if ( this.value && ( !request.term || matcher.test(text) || matcher.test(text_en) ) )
                return {
                  label: text,
                  value: text,
                  option: this
                };
              }) );
          },

          _removeIfInvalid: function( event, ui ) {            

            // Selected an item, nothing to do
            if ( ui.item ) {
              return;
            }

            // Search for a match (case-insensitive)
            var value = this.input.val(),
            valueLowerCase = value.toLowerCase(),
            valid = false;
            this.element.children( "option" ).each(function() {
              if ( $( this ).text().toLowerCase() === valueLowerCase ) {
                this.selected = valid = true;
                return false;
              }
            });

            

            // Found a match, nothing to do
            if ( valid ) {          
              return;
            }

            // Remove invalid value
            this.input
            .val( "" )
            //.attr( "title", value + " didn't match any item" )
            //.tooltip( "open" );
            this.element.val( "" );
            this._delay(function() {
              //this.input.tooltip( "close" ).attr( "title", "" );
            }, 2500 );
            this.input.autocomplete( "instance" ).term = "";
          
            // event will trigger also
            // calcTotal();
            // setClietData($(this.element));
            console.log("_removeIfInvalid", this.element.val());

          },

          _destroy: function() {
            this.wrapper.remove();
            this.element.show();
          }

        });

        $( "#member" ).combobox();
        // $( "#toggle" ).on( "click", function() {
        //   $( "#combobox" ).toggle();
        // });

});