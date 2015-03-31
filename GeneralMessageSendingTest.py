__author__ = 'yuyan'
from selenium import webdriver
#user1 window
driver1=webdriver.Firefox()
driver1.get("http://52.4.50.51/")
driver1.maximize_window()
driver1.find_element_by_id("text").send_keys("user 1")
driver1.find_element_by_id("sendcleartext").click()
driver1.find_element_by_id("text").send_keys("user 1")
driver1.find_element_by_id("sendcleartext").click()

#user 2 window
driver2=webdriver.Firefox()
driver2.get("http://52.4.50.51/")
driver2.set_window_size(800,1000)
driver2.set_window_position(500,0)
driver2.find_element_by_id("room-5").click()
driver2.find_element_by_id("text").send_keys("user 2")
driver2.find_element_by_id("sendcleartext").click()
driver2.find_element_by_id("text").send_keys("user 2")
driver2.find_element_by_id("sendcleartext").click()
driver2.find_element_by_id("menu_button").click()

#user1 type
driver1.find_element_by_id("text").send_keys("user 1")
driver1.find_element_by_id("sendcleartext").click()
driver1.find_element_by_id("text").send_keys("user 1")
driver1.find_element_by_id("sendcleartext").click()

#user2 type
driver2.find_element_by_id("room-5").click()
driver2.find_element_by_id("text").send_keys("user 2")
driver2.find_element_by_id("sendcleartext").click()
driver2.find_element_by_id("text").send_keys("user 2")
driver2.find_element_by_id("sendcleartext").click()
driver2.find_element_by_id("menu_button").click()
