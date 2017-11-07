/**
 * Created by Vova on 07.11.2017.
 */

$(document).ready(function () {

   let app_html = `
      <div class="container">
           <div class="page-header">
                <h1 id="page-title">Read Products</h1>
            </div>
            <div id="page-content"></div>
      </div>
   `;

   $('#app').html(app_html);

   function changePageTitle(page_title) {

       $('#page-title').text(page_title);

       document.title = page_title;
   }

   $.fn.serializeObject = function () {

      let obj = {};

      let a = this.serializeArray();

      $.each(a, function () {
          if(obj[this.name] !== undefined) {
             if(!obj[this.name].push) {
                obj[this.name] = [obj[this.name]];
             }
             obj[this.name].push(this.value || '');
          } else {
             obj[this.name] = this.value || '';
          }
      });
      return obj;
   }
});