# print("Hello world!")

import r6statsapi
import asyncio


loop = asyncio.get_event_loop()

client = r6statsapi.Client('TOKEN')
players = loop.run_until_complete(
    client.get_generic_stats("flareee", r6statsapi.Platform.uplay)
)