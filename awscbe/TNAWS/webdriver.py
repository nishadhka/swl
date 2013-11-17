from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import Select
from selenium.common.exceptions import NoSuchElementException
import unittest, time, re

class Amld(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Firefox()
        self.driver.implicitly_wait(30)
        self.base_url = "https://www.google.co.in/"
        self.verificationErrors = []
        self.accept_next_alert = True
    
    def test_amld(self):
        driver = self.driver
        driver.get(self.base_url + "/search?client=ubuntu&channel=fs&q=tnau-tawn&ie=utf-8&oe=utf-8&gws_rd=cr&ei=DpIcUprnPIiZiAe75IG4DQ")
        driver.find_element_by_css_selector("em").click()
        driver.find_element_by_link_text("Weather Data").click()
        driver.find_element_by_link_text("Coimbatore").click()
        driver.find_element_by_link_text("Anamalai").click()
        driver.find_element_by_link_text("Last Day").click()
	source = driver.execute_script('return document.documentElement.innerHTML')
	f = open('soamld.html','w')
	f.write(source.encode('utf-8'))
	f.close()
        
    def is_element_present(self, how, what):
        try: self.driver.find_element(by=how, value=what)
        except NoSuchElementException, e: return False
        return True
    
    def is_alert_present(self):
        try: self.driver.switch_to_alert()
        except NoAlertPresentException, e: return False
        return True
    
    def close_alert_and_get_its_text(self):
        try:
            alert = self.driver.switch_to_alert()
            alert_text = alert.text
            if self.accept_next_alert:
                alert.accept()
            else:
                alert.dismiss()
            return alert_text
        finally: self.accept_next_alert = True
    	#source = driver.execute_script('return document.documentElement.innerHTML')
	#f = open('soamld.html','w')
	#f.write(source.encode('utf-8'))
	#f.close()
    
    def tearDown(self):
        self.driver.quit()
        self.assertEqual([], self.verificationErrors)

if __name__ == "__main__":
    unittest.main()
