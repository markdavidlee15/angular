///////////////////////////////
// Modified By Lee 28-07-2015
// Get Duplicates via TickerBar
function getDuplicates() {
	var tickerValues = [];
	$('div.moreinfo').each(function () {
		tickerValues.push($(this).attr('original-title'));
	});
	var index = 0;
	//matching ticker values to the texts in the document
	while (index < tickerValues.length) {
		var tickerItem = tickerValues[index];
		var checkSpan = $('*:contains("' + tickerItem + '")').parents('.line_grid').children('.g_6').children('span:nth-child(1)');
		var checkBox = $('*:contains("' + tickerItem + '")').parents('.line_grid').children('.g_3').children('span.checkbox').children('input[type="checkbox"]');
		if (checkBox.is(':checked') == true) {
			checkBox.prop('disabled', false);
			checkSpan.css({
				'text-decoration': 'none',
				'color': '#000'
			})
		} 
		else {
			checkBox.prop('disabled', true);
			checkSpan.css({
				'text-decoration': 'line-through',
				'color': '#F00'
			})
		}
		index++;
	}
}
function checkReset() {
	$(':checkbox').each(function () {
		var me = $(this).parents('.line_grid').find('.title').text().trim();
		var meTxt = me + ' -';
		var myText = $(this).parents('tr').next().find('.line_grid:contains("' + me + '")').find('.title').text();
		if (myText.indexOf(meTxt) != - 1) {
			$(this).parents('tr').next().find('.line_grid:contains("' + meTxt + '")').find(':checkbox').prop('disabled', true);
		}
	});
}
var selectedItems = [];
$().ready(function () {
	//FUNCTIONS
	getDuplicates();
	checkReset();
	//checkbox to radio button behavior
	$(':checkbox').unbind('click');
	$(':checkbox').click(function () {
		//Checkbox as Radio
		var dg = $(this).parents('div.display_group').attr('class').replace('display_group', '').trim();
		var me = $(this).parents('.line_grid').find('.title').text().trim();
		var meTxt = me + ' -';
		var myText = $(this).parents('tr').next().find('.line_grid').find('.title').text();
		var checks = $(this).parents('tr').next().find('.line_grid:contains("' + meTxt + '")').parents('.display_group').find(':checkbox');
		var Txt = $(this).parents('tr').next().find('.line_grid:contains("' + meTxt + '")');
		if ($(this).prop('checked') == true) {
			if (myText.indexOf(meTxt) != - 1) {
				checks.prop('disabled', true).prop('checked', false);
				Txt.find(':checkbox').prop('checked', true).prop('disabled', false).hide();
				Txt.find('.checkbox').append('<input class="cb" type="checkbox" checked="checked" disabled="disabled"></input>');
			}
			$('div.' + dg + ' :checkbox').prop('checked', false).prop('disabled', true);
			$(this).prop('checked', true).prop('disabled', false);
		} 
		else {
			$('div.' + dg + ' :checkbox').prop('checked', false).prop('disabled', false);
			checks.prop('disabled', false).prop('checked', false);
			Txt.find(':checkbox').prop('checked', false).prop('disabled', true).show();
			Txt.find('.cb').remove();
			checkReset();
		}
		//Duplicate Selection Validation

		var checked;
		var descriptionEle = $(this).closest('.line_grid').children('.g_6');
		if (this.checked)
		{
			checked = descriptionEle.text().split('-') [1].substring(6).trim();
			if ($.inArray(checked, selectedItems) != - 1) { //Verify if the item Checked is in array
				var checkbox = $(this);
				checkbox.attr('disabled', true); //To prevent clicking while displaying the error message.
				var errorMessage = $('<span class=\'errorMessClass\' style=\'color: #f00; font-size: 13px; display: block;\'>Session already selected in another timeslot</span>');
				$(this).parents('tr').next().find('.line_grid:contains("' + me + '")').find(':checkbox').prop('checked', false).prop('disabled', true);
				$(this).parents('tr').find(':checkbox').prop('checked', false).prop('disabled', false);
				checks.prop('disabled', false).prop('checked', false);
				checkReset();
				descriptionEle.append(' ');
				errorMessage.appendTo(descriptionEle).show(3000);
				setTimeout(function () {
					$('.errorMessClass').fadeOut(1000, function () {
						errorMessage.remove();
						checkbox.attr('disabled', false);
					});
				}, 500);
				return false;
			}
		} else {
			selectedItems.splice($.inArray(descriptionEle.text().split('-') [1].substring(6).trim(), selectedItems), 1); //Remove the selected item from the Array
		}
		selectedItems = [
		];
		$('.display_group input:checked').each(function () {
			selectedItems.push($(this).closest('.line_grid').children('.g_6').text().split('-') [1].substring(6).trim());
		});
		refreshPageTotal();
	});
});