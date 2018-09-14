import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { TreeNode } from 'primeng/api';
import Album = Definitions.Album;
import { AutoComplete } from 'primeng/primeng';

@Component({
  selector: 'app-album-group-selector',
  templateUrl: 'album-group-selector.component.html'
})
export class AlbumGroupSelectorComponent implements OnInit {

  @Input()
  albums: Album[];

  @Input()
  groups: string[];

  @Output()
  groupsChange: EventEmitter<string[]> = new EventEmitter<string[]>();

  @ViewChild('autoComplete')
  autoComplete: AutoComplete;

  groupName: string;
  selectedGroups: TreeNode[] = [];
  levelGroups: TreeNode[];
  allGroupsTreeNodes: TreeNode[];


  constructor() {
  }

  addGroup(groupOrGroupName): void {
    let group = groupOrGroupName;
    if (typeof groupOrGroupName === 'string') {
      group = this.levelGroups.find(group => group.label === groupOrGroupName);
      if (!group) {
        group = {
          label: groupOrGroupName,
          expandedIcon: 'fa fa-folder-open',
          collapsedIcon: 'fa fa-folder',
          expanded: true,
          children: []
        };
      }
    }
    this.groupName = undefined;
    this.autoComplete.inputEL.nativeElement.blur();
    this.setGroups(this.selectedGroups.concat(group));
  }

  deleteLastGroup(): void {
    this.selectedGroups.pop();
    this.setGroups(this.selectedGroups);
  }

  setGroups(groups: TreeNode[]): void {
    this.selectedGroups = groups;
    this.levelGroups = groups.length ? groups[groups.length - 1].children : [...this.allGroupsTreeNodes];
    this.groupsChange.emit(this.selectedGroups.map(group => group.label));
  }

  refreshAutocompleteGroups() {
    this.levelGroups = [...this.levelGroups];
  }

  showDropdown(a: AutoComplete): void {
    if (this.levelGroups.length) {
      this.refreshAutocompleteGroups();
      a.show();
    }
  }

  ngOnInit() {
    this.allGroupsTreeNodes = this.createGroupTreeNodes(this.albums);
    this.levelGroups = [...this.allGroupsTreeNodes];
  }

  selectGroupNode(event): void {
    let selectedNode: TreeNode = event.node;
    const flattenedGroups = [];
    while (selectedNode) {
      flattenedGroups.unshift(selectedNode);
      selectedNode = selectedNode.parent;
    }
    this.setGroups(flattenedGroups);
  }


  private createGroupTreeNodes(albums: Album[]): TreeNode[] {
    return albums.reduce((groups, album) => this.createTreeFromGroupNames(album.tree, groups), []);
  }

  private createTreeFromGroupNames(groupNames: string[], groups: TreeNode[]): TreeNode[] {
    let i = 0;
    let groupName = groupNames[i];
    let children = groups;
    let key = groupName;
    while (groupName) {
      let group = children.find(group => group.label === groupName);
      if (!group) {
        group = {
          label: groupName,
          expandedIcon: 'fa fa-folder-open',
          collapsedIcon: 'fa fa-folder',
          children: []
        };
        children.push(group);
      }
      groupName = groupNames[++i];
      children = group.children;
      key += group.label;
    }
    return groups;
  }
}
