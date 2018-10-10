<?php /* This page is designed to use a class to temporarily store checkout info */
class checkoutInfodata
{
    public $firstName;
    public $lastName;
    public $address;
    public $company;
    public $city;
    public $postcode;
    public $state;
    public $country;
    public $email;
    public $telephone;

    public $cardName;
    public $cardNumber;
    public $expiryMonth;
    public $expiryYear;
    public $cvv;

    public function setCheckout1Info($firstName, $lastName, $address, $company, $city, $postcode, $state, $country,$email, $telephone){
        $this->firstName = $firstName;
        $this->lastName = $lastName;
        $this->address = $address;
        $this->company = $company;
        $this->city = $city;
        $this->postcode = $postcode;
        $this->state = $state;
        $this->country = $country;
        $this->email = $email;
        $this->telephone = $telephone;
    }

    public function setCheckout2Info($cardName, $cardNumber, $expiryMonth, $expiryYear, $cvv){
        $this->cardName = $cardName;
        $this->cardNumber = $cardNumber;
        $this->expiryMonth = $expiryMonth;
        $this->expiryYear = $expiryYear;
        $this->cvv = $cvv;
    }
}

// Converting input into HTML Entities
function test_input($data) {
    $data = trim($data);
    $data = strip_tags($data);
    $data = htmlentities($data);
    return $data;
}

?>