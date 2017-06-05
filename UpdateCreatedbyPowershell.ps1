[System.Reflection.Assembly]::LoadWithPartialName("Microsoft.SharePoint.Client")
[System.Reflection.Assembly]::LoadWithPartialName("Microsoft.SharePoint.Client.Runtime")


Function Get-SPOContext([string]$Url,[string]$UserName,[string]$Password)
{
    $SecurePassword = $Password | ConvertTo-SecureString -AsPlainText -Force
    $context = New-Object Microsoft.SharePoint.Client.ClientContext($Url)
    $context.Credentials = New-Object Microsoft.SharePoint.Client.SharePointOnlineCredentials($UserName, $SecurePassword)
    return $context
}

Function Get-ListItems([Microsoft.SharePoint.Client.ClientContext]$Context, [String]$ListTitle) {
    $list = $Context.Web.Lists.GetByTitle($listTitle)
    $qry = [Microsoft.SharePoint.Client.CamlQuery]::CreateAllItemsQuery()
    $items = $list.GetItems($qry)
    $Context.Load($items)
    $Context.ExecuteQuery()
    return $items 
}



$UserName = "sync@oshochem.com"
$Password = "Starzole$"    
$Url = "https://oshoche.sharepoint.com/sites/ke"


$context = Get-SPOContext -Url $Url -UserName $UserName -Password $Password
$list = $context.Web.Lists.GetByTitle("Petty Cash")
$listItem = $list.GetItemById(98)
$listItem["Author"] = "28;#i:0#.f|membership|wangu@oshochem.com"
$listItem.Update()
$context.Load($listItem)      
$context.ExecuteQuery() 

$context.Dispose()