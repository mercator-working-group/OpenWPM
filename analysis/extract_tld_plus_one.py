import sqlite3
import logging
import pandas as pd
from urllib.parse import urlparse
from tld import get_tld, get_fld

logger = logging.getLogger('analysis')
logger.setLevel('INFO')

# Read sqlite query results into a pandas DataFrame
con = sqlite3.connect("../data/crawl-data-test.sqlite")

site_visits = pd.read_sql_query("SELECT * from site_visits", con)
# javascript = pd.read_sql_query("SELECT * from javascript", con)

def parse_tld_url(url):
    return get_fld(url, fail_silently=True)

site_visits['tld_url'] = site_visits['site_url'].apply(parse_tld_url)
print(site_visits['tld_url'].value_counts().head(20))

import pdb; pdb.set_trace()

# verify that result of SQL query is stored in the dataframe
site_visits.head()
javascript.head()

con.close()