class HomeController < ApplicationController
	def index
		presset = params[:presset]
		redirect_to presset_show_path(presset) if presset
	end
end
