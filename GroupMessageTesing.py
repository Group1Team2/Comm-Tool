from selenium import webdriver


# user 1
driver1 = webdriver.Firefox()
driver1.get("http://52.4.50.51/")
driver1.set_window_size(700, 1000)
driver1.set_window_position(0, 0)
#user 2
driver2 = webdriver.Firefox()
driver2.get("http://52.4.50.51/")
driver2.set_window_size(700, 1000)
driver2.set_window_position(700, 0)

#user 1 and user 2 talking in team one
driver1.find_element_by_id("room-6").click()
driver2.find_element_by_id("room-6").click()

driver1.find_element_by_id("text").send_keys("user 1 typing")
driver1.find_element_by_id("sendcleartext").click()


driver1.find_element_by_id("text").send_keys("user 1 typing")
driver1.find_element_by_id("sendcleartext").click()
driver2.find_element_by_id("text").send_keys("user 2 typing")
driver2.find_element_by_id("sendcleartext").click()
driver2.find_element_by_id("text").send_keys("user 2 typing")
driver2.find_element_by_id("sendcleartext").click()

driver1.find_element_by_id("menu_button").click()
driver2.find_element_by_id("menu_button").click()

#check if general team can see message in group one
#error can not get the text content from messagecontent div

room_list = ["room-5", "room-6", "room-7", "room-8", "room-9"]
i = 0
for i in range(len(room_list)):
    if room_list[i] != "room-6":
        driver1.find_element_by_id(room_list[i]).click()
        ele = driver1.find_element_by_id(room_list[i])
        assert "user 1 typing" not in ele.text
        assert "user 2 typing" not in ele.text
        driver1.find_element_by_id("menu_button").click()

        driver2.find_element_by_id(room_list[i]).click()
        ele = driver2.find_element_by_id(room_list[i])
        assert "user 1 typing" not in ele.text
        assert "user 2 typing" not in ele.text
        driver2.find_element_by_id("menu_button").click()
    else:
        driver1.find_element_by_id(room_list[i]).click()
        ele = driver1.find_element_by_id(room_list[i]).text
        print ele
        assert "user 1 typing" in ele.text
        assert "user 2 typing" in ele.text
        driver1.find_element_by_id("menu_button").click()

        driver2.find_element_by_id(room_list[i]).click()
        ele = driver2.find_element_by_id(room_list[i])
        assert "user 1 typing" in ele.text
        assert "user 2 typing" in ele.text
        driver2.find_element_by_id("menu_button").click()

driver1.close()
driver2.close()
