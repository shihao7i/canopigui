JSON property configuration for meta data
=========================================

title: label to be shown in Admin GUI's dropdown 
code: COLM table name 
value:  the JSON file to load for Mock data (when 'MOCK_DATA_FLAG': true is configured in constants.js) 
sortId:  the column to be sorted in alphabetical order (Note: default to sorting on the first visible column if none is specified here)
uniqueColumns: the columns used to compare with the other rows for uniqueness (Note: If this is not specified, the comparison is based on the content of the entire row)
ulrSuffix: this is used to construct the full restful url based on COLM's naming convention
columWidths: define the large, medium and small column widths (using column id values)
rule: define invalidCondition and the errorMessage to display if the rule is violated
pinnedColumns: specify the columns to be pinned on the left side of the table
autopopulatedFields: property value to be populated automatically (for example: [{"attribute": "QUEUE"}])
woTypeSearchCriteria: set this value to true if WO Type search criteria is needed 