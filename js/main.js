let productNameElement=document.getElementById('productNameElement');
let productPriceElement=document.getElementById('productPriceElement');
let productCategoryElement=document.getElementById('productCategoryElement');
let productDesElement=document.getElementById('productDesElement');
let addProductBtn = document.getElementById('addProductBtn');
let updateProductBtn=document.getElementById('updateProductBtn');
let tabBody = document.getElementById('tabBody');
let productSearchElement=document.getElementById('productSearchElement');
let errorMassage=document.getElementById('errorMassage');
let productsArray =[];

if(localStorage.getItem('productsContainer') != null)
{
    productsArray=JSON.parse(localStorage.getItem('productsContainer'));
    displayProducts(productsArray);
}

function addProduct()
{
    if(productNameElement.value =='' || productPriceElement.value =='' || productCategoryElement.value == '' || productDesElement.value == '')
    {
        errorAllInputRequired();
    }
    else
    {
        if(validateProductName() == true && validateProductPrice() == true && validateProductCategory() == true && validateProductDesc() == true)
   {
    const product={
        Name:productNameElement.value,
        Price:productPriceElement.value,
        Category:productCategoryElement.value,
        Desc:productDesElement.value
    };

    if(errorMassage.classList.contains('d-inline-block')== true)
    {
        removeErrorMassage();
    }
    else
    {
        productsArray.push(product);
        localStorage.setItem('productsContainer',JSON.stringify(productsArray));
        clearForm();
        removeValidationFromAllInputs();
        displayProducts(productsArray);
        Swal.fire({
            title: 'Add Product !',
            text: 'Success',
            icon: 'success',
            confirmButtonText: 'Ok'
          })
    }
   }
   else
   {
    showErrorMassage();
   }

    }
   
}
if(addProductBtn != null)
{
    addProductBtn.addEventListener('click',()=>{
        addProduct();
    });
}

function displayProducts(productElements)
{
    let temp =``;
    for (let index = 0; index < productElements.length; index++) {
        temp += `
    <tr>
        <th scope="row">${index}</th>
        <td>${productElements[index].Name}</td>
        <td>${productElements[index].Price}</td>
        <td>${productElements[index].Category}</td>
        <td>${productElements[index].Desc}</td>
        <td>
            <i  onclick="setFormForUpdate(${index})" class="fa-solid fa-pen-to-square me-2"></i>
            <i onclick="deleteElementFromProductList(${index})"  class="fa-solid fa-trash-can "></i>
        </td>
      </tr>
    `;
    }
    tabBody.innerHTML = temp;
}
function clearForm()
{
    productNameElement.value='';
    productPriceElement.value='';
    productCategoryElement.value='';
    productDesElement.value='';
}

function deleteElementFromProductList(elementIndex)
{
 
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showDenyButton: true,
       confirmButtonText: 'Yes , Delete It',
       denyButtonText: 'Cancle',
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            productsArray.splice(elementIndex,1);
            localStorage.setItem('productsContainer',JSON.stringify(productsArray));
            displayProducts(productsArray);
        }
      })
   
}
function setFormForUpdate(elementIndex)
{
    productNameElement.value=productsArray[elementIndex].Name;
    productPriceElement.value=productsArray[elementIndex].Price;
    productCategoryElement.value=productsArray[elementIndex].Category;
    productDesElement.value=productsArray[elementIndex].Desc;
    addProductBtn.classList.add('d-none');
    updateProductBtn.classList.replace('d-none','d-inline-block')
    updateProductBtn.value=elementIndex;
}
function updateProductInProductList(elementIndex)
{
    if(productNameElement.value =='' || productPriceElement.value =='' || productCategoryElement.value == '' || productDesElement.value == '')
    {
        errorAllInputRequired();
    }
    else
    {
        if(validateProductName() == true && validateProductPrice() == true && validateProductCategory() == true && validateProductDesc() == true)
    {
        if(errorMassage.classList.contains('d-inline-block')== true)
        {
            removeErrorMassage();
        }
        else
        {
            productsArray[elementIndex].Name=productNameElement.value;
            productsArray[elementIndex].Price=productPriceElement.value;
            productsArray[elementIndex].Category=productCategoryElement.value;
            productsArray[elementIndex].Desc=productDesElement.value;
            localStorage.setItem('productsContainer',JSON.stringify(productsArray));
            addProductBtn.classList.replace('d-none','d-inline-block');
            updateProductBtn.classList.replace('d-inline-block','d-none')
            clearForm();
            removeValidationFromAllInputs();
            displayProducts(productsArray);
            Swal.fire({
                title: 'Updated !',
                text: 'Success',
                icon: 'success',
                confirmButtonText: 'Ok'
              })
        }
    }
    else
    {
     showErrorMassage();
    }
    }
    
}
if(updateProductBtn != null)
{
    updateProductBtn.addEventListener('click',()=>{
        updateProductInProductList(updateProductBtn.value); 
    });
}
function seacrchElementInProductList()
{
    let searchArray=[];
    for (let index = 0; index <productsArray.length; index++) 
    {
        if(productsArray[index].Name.toLowerCase().includes(productSearchElement.value.toLowerCase()) == true)
        {
            searchArray.push(productsArray[index]);
        }
    }
    displayProducts(searchArray);
}

productSearchElement.addEventListener('input',() => {
    seacrchElementInProductList();
})
function errorAllInputRequired()
{
    errorMassage.classList.replace('d-none','d-inline-block');
    errorMassage.innerHTML='Please Enter All Data';
}
function removeErrorMassage()
{
    errorMassage.classList.replace('d-inline-block','d-none');
}
function showErrorMassage()
{
    errorMassage.classList.replace('d-none','d-inline-block');
    errorMassage.innerHTML='Entered Data Is In Wrong Format';
}
function validateProductName()
{
    let regex=/^[a-zA-Z]{3,8}$/;
    if(productNameElement.value == '')
    {
       removeValidationFromProductName();
    }
    else
    {
        if(regex.test(productNameElement.value)== true)
        {
            if(productNameElement.classList.contains('is-invalid') == true)
            {
                productNameElement.classList.replace('is-invalid','is-valid');
            }
            else
            {
                productNameElement.classList.add('is-valid');
            }
            return true;
        }
        else
        {
            if(productNameElement.classList.contains('is-valid') == true)
            {
                productNameElement.classList.replace('is-valid','is-invalid');
            }
            else
            {
                productNameElement.classList.add('is-invalid');
            }  
            return false; 
        }
    }
}
function validateProductPrice()
{
    let regex=/^[0-9]+$/;
    if(productPriceElement.value == '')
    {
       removeValidationFromProductPrice();
    }
    else
    {
        if(regex.test(productPriceElement.value)== true)
        {
            if(productPriceElement.classList.contains('is-invalid') == true)
            {
                productPriceElement.classList.replace('is-invalid','is-valid');
            }
            else
            {
                productPriceElement.classList.add('is-valid');
            }
            return true;
        }
        else
        {
            if(productPriceElement.classList.contains('is-valid') == true)
            {
                productPriceElement.classList.replace('is-valid','is-invalid');
            }
            else
            {
                productPriceElement.classList.add('is-invalid');
            }  
            return false; 
        }
    }
   
}
function validateProductCategory()
{
    let regex=/^[a-zA-Z]{2,8}$/;
    if(productCategoryElement.value == '')
    {
        removeValidationFromProductCategory();
    }
    else
    {
        if(regex.test(productCategoryElement.value)== true)
    {
        if(productCategoryElement.classList.contains('is-invalid') == true)
        {
            productCategoryElement.classList.replace('is-invalid','is-valid');
        }
        else
        {
            productCategoryElement.classList.add('is-valid');
        }
        return true;
    }
    else
    {
        if(productCategoryElement.classList.contains('is-valid') == true)
        {
            productCategoryElement.classList.replace('is-valid','is-invalid');
        }
        else
        {
            productCategoryElement.classList.add('is-invalid');
        }  
        return false; 
    }
    }
}
function validateProductDesc()
{
    let regex=/^[a-zA-Z]{3,}$/;
    if(productDesElement.value == '')
    {
       removeValidationFromProductDesc();
    }
    else
    {
        if(regex.test(productDesElement.value)== true)
        {
            if(productDesElement.classList.contains('is-invalid') == true)
            {
                productDesElement.classList.replace('is-invalid','is-valid');
            }
            else
            {
                productDesElement.classList.add('is-valid');
            }
            return true;
        }
        else
        {
            if(productDesElement.classList.contains('is-valid') == true)
            {
                productDesElement.classList.replace('is-valid','is-invalid');
            }
            else
            {
                productDesElement.classList.add('is-invalid');
            }  
            return false; 
        }
    }
}
function removeValidationFromProductName()
{
    if(productNameElement.classList.contains('is-valid') == true)
    {
        productNameElement.classList.remove('is-valid');
    }
    else if (productNameElement.classList.contains('is-invalid') == true)
    {
        productNameElement.classList.remove('is-invalid');
    }
}
function removeValidationFromProductPrice()
{
    if(productPriceElement.classList.contains('is-valid') == true)
    {
        productPriceElement.classList.remove('is-valid');
    }
    else if (productPriceElement.classList.contains('is-invalid') == true)
    {
        productPriceElement.classList.remove('is-invalid');
    }
}
function removeValidationFromProductCategory()
{
    if(productCategoryElement.classList.contains('is-valid') == true)
    {
        productCategoryElement.classList.remove('is-valid');
    }
    else if (productCategoryElement.classList.contains('is-invalid') == true)
    {
        productCategoryElement.classList.remove('is-invalid');
    }
}
function removeValidationFromProductDesc()
{
    if(productDesElement.classList.contains('is-valid') == true)
    {
        productDesElement.classList.remove('is-valid');
    }
    else if (productDesElement.classList.contains('is-invalid') == true)
    {
        productDesElement.classList.remove('is-invalid');
    }
}
function removeValidationFromAllInputs()
{
    removeValidationFromProductName();
    removeValidationFromProductPrice();
    removeValidationFromProductCategory();
    removeValidationFromProductDesc();
}
productNameElement.addEventListener('input', validateProductName);
productPriceElement.addEventListener('input', validateProductPrice);
productCategoryElement.addEventListener('input', validateProductCategory);
productDesElement.addEventListener('input', validateProductDesc);