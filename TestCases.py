import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys

class TestCase(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Firefox()

    def test_mobile_cp_switch(self):

        driver = self.driver
        #test the cp size
        driver.maximize_window()
        driver.get("http://52.4.50.51/")
        driver.find_element_by_id("room-5").click()
        driver.find_element_by_id("text").send_keys("cp size test")
        driver.find_element_by_id("sendcleartext").click()
        driver.find_element_by_id("text").send_keys("cp size test")
        driver.find_element_by_id("sendcleartext").click()
        #test the mobile size
        driver.set_window_size(800,1000)

        driver.find_element_by_id("text").send_keys("mobile size test")
        driver.find_element_by_id("sendcleartext").click()
        driver.find_element_by_id("text").send_keys("mobile size test")
        driver.find_element_by_id("sendcleartext").click()


    def test_button_function(self):

        driver = self.driver
        driver.set_window_size(800,1000)
        driver.get("http://52.4.50.51/")
        #room and home change buttons
        driver.find_element_by_id("room-5").click()
        driver.find_element_by_id("text").send_keys("general room")
        driver.find_element_by_id("sendcleartext").click()
        driver.find_element_by_id("text").send_keys("general room")
        driver.find_element_by_id("sendcleartext").click()
        driver.find_element_by_id("menu_button").click()

        driver.find_element_by_id("room-6").click()
        driver.find_element_by_id("text").send_keys("team one")
        driver.find_element_by_id("sendcleartext").click()
        driver.find_element_by_id("text").send_keys("team one")
        driver.find_element_by_id("sendcleartext").click()
        driver.find_element_by_id("menu_button").click()

        driver.find_element_by_id("room-7").click()
        driver.find_element_by_id("text").send_keys("team two")
        driver.find_element_by_id("sendcleartext").click()
        driver.find_element_by_id("text").send_keys("team two")
        driver.find_element_by_id("sendcleartext").click()
        driver.find_element_by_id("menu_button").click()

        driver.find_element_by_id("room-8").click()
        driver.find_element_by_id("text").send_keys("team three")
        driver.find_element_by_id("sendcleartext").click()
        driver.find_element_by_id("text").send_keys("team three")
        driver.find_element_by_id("sendcleartext").click()
        driver.find_element_by_id("menu_button").click()

        driver.find_element_by_id("room-9").click()
        driver.find_element_by_id("text").send_keys("team four")
        driver.find_element_by_id("sendcleartext").click()
        driver.find_element_by_id("text").send_keys("team four")
        driver.find_element_by_id("sendcleartext").click()
        driver.find_element_by_id("menu_button").click()

        #test the send button and return for message sending
        driver.maximize_window()
        driver.find_element_by_id("text").send_keys("sendcleartext button test")
        driver.find_element_by_id("sendcleartext").click()
        driver.find_element_by_id("text").send_keys("sendcleartext button test")
        driver.find_element_by_id("sendcleartext").click()
        driver.find_element_by_id("text").send_keys("return key press test")
        driver.find_element_by_id("text").send_keys(Keys.RETURN)
        driver.find_element_by_id("text").send_keys("return key press test")
        driver.find_element_by_id("text").send_keys(Keys.RETURN)
        driver.find_element_by_id("text").send_keys("sendcleartext button test")
        driver.find_element_by_id("sendcleartext").click()
        driver.find_element_by_id("text").send_keys("sendcleartext button test")
        driver.find_element_by_id("sendcleartext").click()
        driver.find_element_by_id("text").send_keys("return key press test")
        driver.find_element_by_id("text").send_keys(Keys.RETURN)
        driver.find_element_by_id("text").send_keys("return key press test")
        driver.find_element_by_id("text").send_keys(Keys.RETURN)


    def tearDown(self):
        self.driver.close()

if __name__ == "__main__":
    unittest.main()
