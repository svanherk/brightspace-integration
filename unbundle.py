#!/usr/bin/python3

import os
import argparse
import json
import shutil
import stat

PATH_TO_LMS = "C:/D2L/instances/"
RELATIVE_PATH_CONFIG = "/config/Infrastructure/D2L.LP.Web.UI.Html.Bsi.config.json"

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

# Parse the command line arguments
def get_params():
    parser = argparse.ArgumentParser()

    parser.add_argument(
        "--bsi-path",
        help = "The path to your BSI repo.",
        default="./"
    )
    
    parser.add_argument(
        "--component-path",
        help="The path to the BSI component you are interested in unbundling.",
        required=True
    )

    parser.add_argument(
        "--instance-name",
        help="The name of the LMS instance you are interested in unbundling.",
        default="lsone"
    )
    args = parser.parse_args()

    # Set the path to the repos, the component name and LMS path
    args.bsi_repo_dir = args.bsi_path
    args.component_repo_dir = args.component_path

    # Get the component package name
    with open(args.component_repo_dir + "/package.json", "r") as data_file:
       args.component_name = json.load(data_file)["name"]
    
    # Get the path to the LMS
    args.path_to_lms = PATH_TO_LMS + args.instance_name

    return args

# Modifies the config file for the desired LMS.
def modify_config_file(args):
    with open(args.path_to_lms + RELATIVE_PATH_CONFIG, "w+") as data_file:
        data = {}
        data["polymer-3"] = "http://localhost:8080/"
        data["import-style"] = "esm"
        json.dump(data, data_file)

# Run the given command
def colour_print(command):
    print(f'{bcolors.OKBLUE}{command}{bcolors.ENDC}')

def remove_dir(path):
    os.system(f"rmdir {path} /S /Q")

        
# Main routine
def main():
    args = get_params()

    # Go to BSI
    colour_print("cd " + args.bsi_repo_dir)
    os.chdir(args.bsi_repo_dir)

    # Delete .npmrc
    try:
        colour_print("rm .npmrc")
        os.remove(".npmrc")
    except:
        pass

    # Delete node_modules
    colour_print("rm -rf ./node_modules")
    remove_dir("node_modules")

    # Install BSI
    colour_print("npm i")
    os.system("npm i")

    # Run BSI build
    colour_print("npm run build")
    os.system("npm run build")

    # Go into component repo
    colour_print("cd " + args.component_repo_dir)
    os.chdir(args.component_repo_dir)

    # Run npm link in component
    colour_print("npm link")
    os.system("npm link")

    # Go back to BSI
    colour_print("cd " + args.bsi_repo_dir)
    os.chdir(args.bsi_repo_dir)

    # npm link component
    colour_print("npm link " + args.component_name)
    os.system("npm link " + args.component_name)

    # Delete component in node_modules
    colour_print("rm -rf " + "node_modules/" + args.component_name + "/node_modules")
    remove_dir("node_modulesnode_modules\\" + args.component_name + "\\node_modules\\")
    
    # Modify BSI config file
    modify_config_file(args)

    # Restart iis
    colour_print("iisreset")
    os.system("iisreset")

    # npm start
    colour_print("npm start")
    os.system("npm start")

# Main method
if __name__ == "__main__":
    main()