#!/usr/bin/python3

import os
import json
import argparse

# Constants
PATH_TO_LMS = os.path.join("C:\\", "D2L", "instances")
RELATIVE_PATH_CONFIG = os.path.join("config", "Infrastructure", "D2L.LP.Web.UI.Html.Bsi.config.json")
DEFAULT_LMS_INSTANCE = "lsone"

READ = "r"
WRITE = "w"

NAME = "name"
PACKAGE = "package.json"
POLYMER = "polymer-3"
IMPORT_STYLE = "import_style"
IMPORT_STYLE_ESM = "esm"
LOCALHOST = "http://localhost:8080/"

# Colours
class bcolors:
    HEADER = '\033[95m'
    OKBLUE = '\033[94m'
    OKGREEN = '\033[92m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'
    UNDERLINE = '\033[4m'

class Unbundler:
    # Parse the command line arguments
    def get_params(self):
        parser = argparse.ArgumentParser()

        parser.add_argument(
            "--bsi-path",
            help = "The path to your BSI repo.",
            default=os.path.dirname(os.path.abspath(__file__))
        )
        
        parser.add_argument(
            "--component-path",
            help="The path to the BSI component you are interested in unbundling.",
            required=True
        )

        parser.add_argument(
            "--instance-name",
            help="The name of the LMS instance you are interested in unbundling.",
            default=DEFAULT_LMS_INSTANCE
        )

        parser.add_argument(
            "-d",
            "--dry",
            help="Outputs the sequence of commands that will be run, without running them.",
            default=False,
            action='store_true'
        )

        args = parser.parse_args()

        # Are we doing a dry run?
        self.dry_run = args.dry

        # Set the path to the repos, the component name and LMS path
        self.bsi_repo_dir = args.bsi_path
        self.component_repo_dir = args.component_path

        # Get the component package name
        with open(os.path.join(self.component_repo_dir, PACKAGE), READ) as data_file:
            self.component_name = json.load(data_file)[NAME]
        
        # Get the path to the LMS
        self.path_to_lms = os.path.join(PATH_TO_LMS, args.instance_name)

    # Modifies the config file for the desired LMS.
    def modify_config_file(self):
        if not self.dry_run:
            with open(os.path.join(self.path_to_lms, RELATIVE_PATH_CONFIG), WRITE) as data_file:
                data = {}

                data[POLYMER] = LOCALHOST
                data[IMPORT_STYLE] = IMPORT_STYLE_ESM

                json.dump(data, data_file)
        self.print_cmd("Updated LMS Config")
        

    # Run the given command
    def print_cmd(self, command):
        print("[COMMAND] " + command)

    # Removes a directory given the path to the directory
    def remove_dir(self, path):
        self.print_cmd("rm -rf " + path)
        if not self.dry_run:
            os.system("rmdir " + path + " /S /Q")

    # Run a command and print it
    def run_command(self, command):
        self.print_cmd(command)
        if not self.dry_run:
            os.system(command)

    # Change directory and print it
    def change_dir(self, path):
        self.print_cmd("cd " + path)
        os.chdir(path)

    # Main routine
    def main(self):
        self.get_params()

        # Go to BSI
        self.change_dir(self.bsi_repo_dir)

        # Delete .npmrc
        try:
            self.print_cmd("rm .npmrc")
            os.remove(".npmrc")
        except:
            pass

        # Delete node_modules
        self.remove_dir("node_modules")

        # Install BSI
        self.run_command("npm i")

        # Run BSI build
        self.run_command("npm run build")

        # Go into component repo
        self.change_dir(self.component_repo_dir)

        # Run npm link in component
        self.run_command("npm link")

        # Go back to BSI
        self.change_dir(self.bsi_repo_dir)

        # npm link component
        self.run_command("npm link " + self.component_name)

        # Delete component in node_modules
        self.remove_dir(os.path.join("node_modules", self.component_name, "node_modules"))

        # Modify BSI config file
        self.modify_config_file()

        # Restart iis
        self.run_command("iisreset")


# Main method
if __name__ == "__main__":
    unbundler = Unbundler()
    unbundler.main()