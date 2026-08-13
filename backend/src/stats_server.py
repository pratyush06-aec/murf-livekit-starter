"""
Lightweight HTTP server that exposes call stats from the SQLite database.
Runs alongside the LiveKit agent on port 8089.
"""

import json
from http.server import HTTPServer, BaseHTTPRequestHandler
import threading
import logging

import db

logger = logging.getLogger("stats_server")


class StatsHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path == "/api/stats":
            stats = db.get_call_stats()
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            self.wfile.write(json.dumps(stats).encode())
        else:
            self.send_response(404)
            self.end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()

    def log_message(self, format, *args):
        # Suppress default HTTP request logs to keep terminal clean
        pass


def start_stats_server(port: int = 8089):
    """Start the stats HTTP server in a background daemon thread."""
    server = HTTPServer(("0.0.0.0", port), StatsHandler)
    thread = threading.Thread(target=server.serve_forever, daemon=True)
    thread.start()
    logger.info("Stats API server running on http://localhost:%d/api/stats", port)
