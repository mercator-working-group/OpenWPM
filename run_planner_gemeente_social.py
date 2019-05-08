from __future__ import absolute_import

from six.moves import range

from automation import CommandSequence, TaskManager

from sys import platform

import json

# The list of sites that we wish to crawl
NUM_BROWSERS = 8

# Loads the manager preference and 3 copies of the default browser dictionaries
manager_params, browser_params = TaskManager.load_default_params(NUM_BROWSERS)

# Update browser configuration (use this for per-browser settings)
for i in range(NUM_BROWSERS):
    # Record HTTP Requests and Responses
    browser_params[i]['http_instrument'] = True
    # Record JS Web API calls
    browser_params[i]['js_instrument'] = True
    # Enable flash for all three browsers
    browser_params[i]['disable_flash'] = True
    # Run headless
    browser_params[i]['headless'] = True

# Update TaskManager configuration (use this for crawl-wide settings)
manager_params['data_directory'] = '~/Desktop/'
manager_params['log_directory'] = '~/Desktop/'

# Instantiates the measurement platform
# Commands time out by default after 60 seconds
manager = TaskManager.TaskManager(manager_params, browser_params)

# Visits the sites with all browsers simultaneously
with open('gemeente-social/gemeente-out-full.json', newline='') as source_json:
    counter = 0
    data = json.load(source_json)
    for parent_site, site_list in data.items():
        counter += 1
        print(f"Processing Parent Site {counter}/{len(data)}")
        child_counter = 0
        all_sites = site_list + [parent_site]

        for site in all_sites:
            child_counter += 1
            print(f"Processing Child Site {child_counter}/{len(all_sites)} for Parent {counter}")

            command_sequence = CommandSequence.CommandSequence(site, parent_site)

            # Start by visiting the page
            command_sequence.get(sleep=0, timeout=60)

            # index='**' synchronizes visits between the three browsers
            manager.execute_command_sequence(command_sequence, index=None)

        # Shuts down the browsers and waits for the data to finish logging
manager.close()
